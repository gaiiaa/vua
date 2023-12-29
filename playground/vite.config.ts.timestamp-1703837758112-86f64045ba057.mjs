// vite.config.ts
import { defineConfig } from "file:///Users/benten/dev/vua/playground/node_modules/.pnpm/vite@5.0.10/node_modules/vite/dist/node/index.js";

// ../src/index.ts
import * as lua from "file:///Users/benten/dev/vua/node_modules/.pnpm/wasmoon@1.16.0/node_modules/wasmoon/dist/index.js";
var luaRegex = /\.lua$/;
var moduleLuaRegex = /\.manual\.lua$/;
var Factory = new lua.LuaFactory();
var luaTmpl = (code) => `
import { LuaFactory } from "wasmoon";

const factory = new LuaFactory();
export const raw = \`${code}\`;

`;
var moduleTmpl = (code, globals = []) => `
import { LuaFactory } from "wasmoon";
const factory = new LuaFactory();
const lua = await factory.createEngine();
${globals.map((g) => `lua.global.set("${g}", ${g});`).join("\n")}
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
function vua(config = {}) {
  return {
    name: "vua",
    transform: (code, id, ctx) => {
      if (typeof config.ssr === "boolean") {
        if (!config.ssr && ctx?.ssr) {
          return;
        }
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
          map: null
        };
      } else if (luaRegex.test(id)) {
        return {
          code: luaTmpl(code),
          map: null
        };
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [vua()],
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2JlbnRlbi9kZXYvdnVhL3BsYXlncm91bmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9iZW50ZW4vZGV2L3Z1YS9wbGF5Z3JvdW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9iZW50ZW4vZGV2L3Z1YS9wbGF5Z3JvdW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWEgZnJvbSBcIi4uL3NyYy9pbmRleFwiXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWEoKV0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxuICB9XG59KTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9iZW50ZW4vZGV2L3Z1YS9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9iZW50ZW4vZGV2L3Z1YS9zcmMvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2JlbnRlbi9kZXYvdnVhL3NyYy9pbmRleC50c1wiO2ltcG9ydCAqIGFzIHZpdGUgZnJvbSBcInZpdGVcIjtcbmltcG9ydCAqIGFzIGx1YSBmcm9tIFwid2FzbW9vblwiO1xuXG5jb25zdCBsdWFSZWdleCA9IC9cXC5sdWEkLztcbmNvbnN0IG1vZHVsZUx1YVJlZ2V4ID0gL1xcLm1hbnVhbFxcLmx1YSQvO1xuXG5jb25zdCBGYWN0b3J5ID0gbmV3IGx1YS5MdWFGYWN0b3J5KClcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJ1bnRpbWUgPSBhc3luYyAoKSA9PiBGYWN0b3J5LmNyZWF0ZUVuZ2luZSgpO1xuXG5leHBvcnQgY29uc3QgcnVuU3RyaW5nID0gYXN5bmMgKGNvZGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBlbmdpbmUgPSBhd2FpdCBjcmVhdGVSdW50aW1lKCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgZW5naW5lLmRvU3RyaW5nKGNvZGUpO1xuICB9IGZpbmFsbHkge1xuICAgIGVuZ2luZS5nbG9iYWwuY2xvc2UoKTtcbiAgfVxufVxuXG5jb25zdCBsdWFUbXBsID0gKGNvZGU6IHN0cmluZykgPT4gYFxuaW1wb3J0IHsgTHVhRmFjdG9yeSB9IGZyb20gXCJ3YXNtb29uXCI7XG5cbmNvbnN0IGZhY3RvcnkgPSBuZXcgTHVhRmFjdG9yeSgpO1xuZXhwb3J0IGNvbnN0IHJhdyA9IFxcYCR7Y29kZX1cXGA7XG5cbmA7XG5cbmNvbnN0IG1vZHVsZVRtcGwgPSAoY29kZTogc3RyaW5nLCBnbG9iYWxzOiBzdHJpbmdbXSA9IFtdKSA9PiBgXG5pbXBvcnQgeyBMdWFGYWN0b3J5IH0gZnJvbSBcIndhc21vb25cIjtcbmNvbnN0IGZhY3RvcnkgPSBuZXcgTHVhRmFjdG9yeSgpO1xuY29uc3QgbHVhID0gYXdhaXQgZmFjdG9yeS5jcmVhdGVFbmdpbmUoKTtcbiR7Z2xvYmFscy5tYXAoKGcpID0+IGBsdWEuZ2xvYmFsLnNldChcIiR7Z31cIiwgJHtnfSk7YCkuam9pbihcIlxcblwiKX1cbmF3YWl0IGx1YS5kb1N0cmluZyhcXGAke2NvZGV9XFxgKTtcbmV4cG9ydCBkZWZhdWx0IG5ldyBQcm94eSh7fSwge1xuICBnZXQoXywga2V5KXtcbiAgICByZXR1cm4gbHVhLmdsb2JhbC5nZXQoa2V5KTtcbiAgfSxcbiAgc2V0KF8sIGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBsdWEuZ2xvYmFsLnNldChrZXksIHZhbHVlKTtcbiAgfVxufSlcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZ1YShjb25maWc6IHtcbiAgaW5jbHVkZT86IFJlZ0V4cFtdO1xuICBleGNsdWRlPzogUmVnRXhwW107XG4gIGdsb2JhbHM/OiBBcnJheTxzdHJpbmc+O1xuICB0eXBlc2NyaXB0PzogYm9vbGVhbjtcbiAgc3NyPzogYm9vbGVhbjtcbn0gPSB7fSk6IHZpdGUuUGx1Z2luIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcInZ1YVwiLFxuICAgIHRyYW5zZm9ybTogKGNvZGUsIGlkLCBjdHgpID0+IHtcbiAgICAgIGlmKHR5cGVvZiBjb25maWcuc3NyID09PSBcImJvb2xlYW5cIil7XG4gICAgICAgIGlmKCFjb25maWcuc3NyICYmIGN0eD8uc3NyKXsgcmV0dXJuOyB9XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmluY2x1ZGUgJiYgIWNvbmZpZy5pbmNsdWRlLnNvbWUoKHIpID0+IHIudGVzdChpZCkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZXhjbHVkZSAmJiBjb25maWcuZXhjbHVkZS5zb21lKChyKSA9PiByLnRlc3QoaWQpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAobW9kdWxlTHVhUmVnZXgudGVzdChpZCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2RlOiBtb2R1bGVUbXBsKGNvZGUpLFxuICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAobHVhUmVnZXgudGVzdChpZCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb2RlOiBsdWFUbXBsKGNvZGUpLFxuICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1IsU0FBUyxvQkFBb0I7OztBQ0MvUyxZQUFZLFNBQVM7QUFFckIsSUFBTSxXQUFXO0FBQ2pCLElBQU0saUJBQWlCO0FBRXZCLElBQU0sVUFBVSxJQUFRLGVBQVc7QUFhbkMsSUFBTSxVQUFVLENBQUMsU0FBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFJWCxJQUFJO0FBQUE7QUFBQTtBQUkzQixJQUFNLGFBQWEsQ0FBQyxNQUFjLFVBQW9CLENBQUMsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSTNELFFBQVEsSUFBSSxDQUFDLE1BQU0sbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQztBQUFBLHVCQUN6QyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV1osU0FBUixJQUFxQixTQU14QixDQUFDLEdBQWdCO0FBQ25CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFdBQVcsQ0FBQyxNQUFNLElBQUksUUFBUTtBQUM1QixVQUFHLE9BQU8sT0FBTyxRQUFRLFdBQVU7QUFDakMsWUFBRyxDQUFDLE9BQU8sT0FBTyxLQUFLLEtBQUk7QUFBRTtBQUFBLFFBQVE7QUFBQSxNQUN2QztBQUNBLFVBQUksT0FBTyxXQUFXLENBQUMsT0FBTyxRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRztBQUM3RDtBQUFBLE1BQ0Y7QUFDQSxVQUFJLE9BQU8sV0FBVyxPQUFPLFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHO0FBQzVEO0FBQUEsTUFDRjtBQUNBLFVBQUksZUFBZSxLQUFLLEVBQUUsR0FBRztBQUMzQixlQUFPO0FBQUEsVUFDTCxNQUFNLFdBQVcsSUFBSTtBQUFBLFVBQ3JCLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRixXQUFXLFNBQVMsS0FBSyxFQUFFLEdBQUc7QUFDNUIsZUFBTztBQUFBLFVBQ0wsTUFBTSxRQUFRLElBQUk7QUFBQSxVQUNsQixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUR4RUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
