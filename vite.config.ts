import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "canvas-render",
      fileName: "canvas-render",
    },
  },
});
