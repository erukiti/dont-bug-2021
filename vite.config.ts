import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), monacoEditorPlugin()],
  resolve: { alias: { "~": path.resolve(__dirname, "./src") } },
});
