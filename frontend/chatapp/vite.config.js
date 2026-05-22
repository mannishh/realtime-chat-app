import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import circularDependency from "vite-plugin-circular-dependency";

export default defineConfig({
  plugins: [react(), tailwindcss(),
    circularDependency({
      outputFilePath: './circular-deps-log.txt' // It will spit out the exact looping files here
    })
  ],
});