import { defineConfig } from "vite";
import vua from "../src/index"

export default defineConfig({
  plugins: [vua()],
  build: {
    target: "esnext",
  }
});