import nodeResolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    format: "iife",
    name: "template",
    file: "template.js",
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    uglify(),
  ],
  onwarn: function (warning, warn) {
    if (warning.code === "CIRCULAR_DEPENDENCY") return;
    if (warning.code === "UNRESOLVED_IMPORT") {
      throw new Error(
        "Couldn't resolve the dependency " + warning.source +
          " (from " + warning.importer + "): sometimes you can" +
          " fix this with 'npm install', or add '" + warning.source +
          " to 'external'. See: " + warning.url
      );
    }
    warn(warning);
  }
};
