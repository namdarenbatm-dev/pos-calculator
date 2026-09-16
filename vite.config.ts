import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ماشین حساب سود و قیمت کارتخوان",
        short_name: "ماشین حساب کارتخوان",
        description: "محاسبه سود، قیمت فروش و سناریوهای فروش کارتخوان",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        lang: "fa",
        dir: "rtl",
        icons: [
          {
            src: "/98A01630-7A7E-4EDB-BAA6-73F3AFC42FFE.png",
            sizes: "1254x1254",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
