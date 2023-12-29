import * as vite from "vite";
import * as lua from "wasmoon";

const luaRegex = /\.lua$/;
const moduleLuaRegex = /\.module\.lua$/;

const Factory = new lua.LuaFactory()

export const createRuntime = async () => Factory.createEngine();

export const runString = async (code: string) => {
  const engine = await createRuntime();
  try {
    await engine.doString(code);
  } finally {
    engine.global.close();
  }
}

const luaTmpl = (code: string) => `
import { LuaFactory } from "wasmoon";

const factory = new LuaFactory();
export const raw = \`${code}\`;

export async function init(globals){
  const lua = await factory.createEngine();
  globals && Object.entries(globals).forEach(([key, value]) => {
    lua.global.set(key, value);
  });
  return {
    run: async () => {
      await lua.doString(raw);
      return new Proxy({}, {
        get(_, key){
          return lua.global.get(key);
        },
        set(_, key, value){
          return lua.global.set(key, value);
        }
      })
    },
    ...lua,
  }
}
`;

const moduleTmpl = (code: string, globals: string[] = []) => `
import { LuaFactory } from "wasmoon";
const factory = new LuaFactory();
const lua = await factory.createEngine();
${globals.map((g) => `lua.global.set("${g}", globalThis.${g});`).join("\n")}
await lua.doString(\`${code}\`);
export default new Proxy({}, {
  get(_, key){
    return lua.global.get(key);
  },
  set(_, key, value){
    return lua.global.set(key, value);
  }
})
`;

export default function vua(config: {
  include?: RegExp[];
  exclude?: RegExp[];
  globals?: Array<string>;
  ssr?: boolean;
} = {}): vite.Plugin {
  return {
    name: "vua",
    transform: (code, id, ctx) => {
      if(typeof config.ssr === "boolean"){
        if(!config.ssr && ctx?.ssr){ return; }
      }
      if (config.include && !config.include.some((r) => r.test(id))) {
        return;
      }
      if (config.exclude && config.exclude.some((r) => r.test(id))) {
        return;
      }
      if (moduleLuaRegex.test(id)) {
        return {
          code: moduleTmpl(code),
          map: null,
        };
      } else if (luaRegex.test(id)) {
        return {
          code: luaTmpl(code),
          map: null,
        };
      }
    },
  };
}