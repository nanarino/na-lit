import { resolve } from "node:path"
import { defineConfig } from "vite"
import alias from "@holy-two/vite-plugin-alias"

export default defineConfig({
    plugins: [alias()],
    build: {
        lib: {
            entry: resolve("./src/lib/index.ts"),
            formats: ["es"],
        },
    },
    publicDir: false,
})
