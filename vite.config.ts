import { resolve } from "node:path"
import { defineConfig } from "vite"
import alias from "@holy-two/vite-plugin-alias"

export default defineConfig({
    plugins: [alias()],
    build: {
        lib: {
            entry: resolve("./src/components/index.ts"),
            formats: ["es"],
        },
    },
})
