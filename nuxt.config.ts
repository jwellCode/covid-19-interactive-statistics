import { NuxtConfig } from "@nuxt/types"
import { fixUrl } from "./utils"

const { BASE_URL } = process.env

const baseUrl = fixUrl(BASE_URL ?? "")

const config: NuxtConfig = {
  /*
   * Target configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-target/
   */
  target: "static",

  /*
   * Public runtime configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-runtime-config/
   */
  publicRuntimeConfig: {
    baseUrl,
  },

  /*
   * Page metadata
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-head/
   */
  head: {
    titleTemplate: (title: string | null) =>
      title
        ? `${title} • COVID-19: Interaktive Statistiken`
        : "COVID-19: Interaktive Statistiken",
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /*
   * Global CSS
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-css/
   */
  css: ["@fontsource/poppins/latin-ext.css"],

  /*
   * Plugins to load before mounting the app
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-plugins/
   */
  plugins: [
    { src: "~/plugins/polyfills.ts", mode: "client" },
    { src: "~/plugins/vue-observe-visibility.ts", mode: "client" },
  ],

  /*
   * Auto import components
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-components/
   */
  components: true,

  /*
   * Build modules
   * See:
   *   - https://typescript.nuxtjs.org/
   *   - https://tailwindcss.nuxtjs.org/
   *   - https://marquez.co/docs/nuxt-optimized-images/
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss",
    "@aceforth/nuxt-optimized-images",
  ],

  /*
   * Build configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-build/
   */
  build: {
    postcss: {
      plugins: {
        "postcss-focus-visible": {},
      },
    },
  },

  /*
   * Optimized images configuration
   * See: https://marquez.co/docs/nuxt-optimized-images/configuration/
   */
  optimizedImages: {
    optimizedImagesInDev: true,
  },

  /*
   * Modules
   * See:
   *   - https://axios.nuxtjs.org/
   *   - https://pwa.nuxtjs.org/
   *   - https://github.com/nuxt-community/robots-module/
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/robots"],

  /*
   * PWA configuration
   * See: https://pwa.nuxtjs.org/setup/#configuration
   */
  pwa: {
    meta: {
      author: "COVID-19: Interaktive Statistiken",
      description: "Entwicklung im Gange!",
      ogSiteName: "COVID-19: Interaktive Statistiken",
      ogTitle: "COVID-19: Interaktive Statistiken",
      ogHost: baseUrl,
      ogImage: "/image.png",
      twitterCard: "summary_large_image",
    },

    manifest: {
      name: "COVID-19: Interaktive Statistiken",
      short_name: "COVID-19",
      description: "Entwicklung im Gange!",
    },
  },
}

export default config
