import { defineConfig } from "tsup";
import cssModulesPlugin from "esbuild-css-modules-plugin";

export default defineConfig({
  esbuildPlugins: [cssModulesPlugin()],
  splitting: true,
  minify: true,
  format: ["cjs", "esm"],
  injectStyle: true,
});
