import { defineConfig } from "vite"

import react from "@vitejs/plugin-react"

import tailwindcss from "@tailwindcss/vite"

import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: "autoUpdate",

      manifest: {

        name: "Gully Cricket Dashboard",

        short_name: "GullyCricket",

        description:
          "Live Cricket Scoring App",

        theme_color: "#000000",

        background_color: "#000000",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

    }),

  ],

})