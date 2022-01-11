import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import autoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    components({
      dts: "src/components.d.ts",
    }),
    pluginRewriteAll(),
    autoImport({
      dts: "src/auto-imports.d.ts",
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ["vue", "vue-router"],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://api.sandbox.drinkrooshine.com/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        toProxy: true,
      },
    },
    watch: {
      ignored: ["src/components.d.ts", "src/auto-import.d.ts"],
    },
  },
});
