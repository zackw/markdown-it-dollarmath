import typescript from "rollup-plugin-typescript2"
import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"

export default {
  input: "src/index.ts",
  plugins: [
    typescript(), // Integration between Rollup and Typescript
    babel({ babelHelpers: "bundled" }), // transpile ES6/7 code
    resolve(), // resolve third party modules in node_modules
    json() // import json files as modules
  ],
  output: [
    {
      file: "dist/index.umd.js",
      exports: "named",
      format: "umd", // commonJS
      name: "markdownitDollarmath", // window.name if script loaded directly in browser
      sourcemap: true
    },
    {
      file: "dist/index.umd.min.js",
      exports: "named",
      format: "umd",
      name: "markdownitDollarmath",
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: "dist/index.esm.js",
      exports: "named",
      format: "esm",
      sourcemap: true
    },
    {
      file: "dist/index.esm.min.js",
      exports: "named",
      format: "esm", // ES Modules
      plugins: [terser()],
      sourcemap: true
    }
  ]
}
