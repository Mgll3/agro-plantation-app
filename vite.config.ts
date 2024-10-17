/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/",
	test: {
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
		globals: true,
		css: true
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./public")
		}
	}
});
