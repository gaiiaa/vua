<div align="center">
<br />

![Vua](.github/banner.jpg)

<h3>Vua</h3>

#### Lua Vite Plugin

[![Npm package yearly downloads](https://badgen.net/npm/dy/express)](https://npmjs.com/package/express)
[![GitHub stars](https://img.shields.io/github/stars/freeCodeCamp/freeCodeCamp.svg?style=social&label=Star&maxAge=2592000)](https://github.com/freeCodeCamp/freeCodeCamp)
[![NuGet stable version](https://badgen.net/nuget/v/newtonsoft.json)](https://nuget.org/packages/newtonsoft.json)

*Seamlessly interop between Lua and Javascript via Vite.*
</div>

## Introduction

Ever wish Lua became the language of the browser instead of Javascript? Ever wanted to server render HTML with the same language Roblox uses for plugins? Well now you can. Vua is a Vite plugin for loading and running Lua scripts from Javasript using [Wasmoon](https://github.com/ceifa/wasmoon).

## Usage

#### 1. Install as a Vite Plugin
```ts
import { defineConfig } from "vite";
import vua from "@gaiiaa/vua";

export default defineConfig({
  plugins: [vua()]
});
```

##### Typescript (optional)

Add `/// <reference types="@gaiiaa/vua" />` to your project.

#### 2. Create a Lua script
```lua
print("Hello world!")
function main(args)
  local div = window.document.body:appendChild(
    window.document:createElement("div")
  )
  div.textContent = args
end
```

#### 3. Import into JS
```js
import { init } from "./script.lua";

const script = await init({ window }).then(m => m.run())

script.entry("WOOO!")
```

## Module Mode

Lua scripts postfixed with `.module.lua` work like ES6 modules. They run on import and provide a proxy to global variables.

```js
import script from "./script.lua";

script.doWork();
```

JS global variables can be injected into lua modules in the Vite plugin config.

```js
export default defineConfig({
  plugins: [vua({
    globals: ["document", "alert" ] // globalThis.document, globalThis.alert
  })]
});
```

## Raw 

You can import the raw script and set up your own runtime if you want full control of the execution context. Refer to the [Wasmoon](https://github.com/ceifa/wasmoon) docs for details.

```js
import { createRuntime } from "@gaiiaa/vua"
import { raw } from "./script.lua"
import $ from "jquery"

const runtime = await createRuntime();

runtime.global.set("j", $);
runtime.global.setMemoryMax(1024);

await runtime.doString(raw);

runtime.global.call("entry", 1, 2, 3)
```
## Plugin Options

`include?: Array<RegExp>` <br>
`exclude?: Array<RegExp>` <br>
`globals?: Array<string>` <br>
`ssr?:     boolean;`: Should transform SSR imports?

## License

Made with 💛

Published under [MIT License](./LICENSE).

