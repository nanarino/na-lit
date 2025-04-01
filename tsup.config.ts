import { defineConfig } from "tsup"

export default defineConfig([
    {
        entry: ["src/components/Pagination/index.ts"],
        target: "esnext",
        format: ["esm"],
        dts: true,
        clean: true,
    },
])
