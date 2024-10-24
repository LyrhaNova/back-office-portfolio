// vite.config.ts
import {resolve} from "path";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "vite-plugin-tailwindcss";
var vite_config_default = defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src"),
      "@stores": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/stores"),
      "@components": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/components"),
      "@screens": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/screens"),
      "@utils": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/utils"),
      "@services": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/services"),
      "@hooks": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/hooks"),
      "@routes": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/routes"),
      "@constants": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/constants"),
      "@img": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/img"),
      "@types": resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/types"),
      types: resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "./src/types")
    }
  },
  server: {
    port: 8081
  },
  build: {
    outDir: "../app/build",
    rollupOptions: {
      input: {
        main: resolve("C:\\Users\\AwiZy63\\Desktop\\BazooClone\\web", "index.html")
      }
    }
  }
});
export {
  vite_config_default as default
};
