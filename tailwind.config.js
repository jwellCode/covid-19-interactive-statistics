const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/*
 * Tailwind CSS configuration
 *
 * Docs: https://tailwindcss.com/docs/configuration/
 * Default: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  /*
   * Theme configuration
   * See: https://tailwindcss.com/docs/theme
   */
  theme: {
    // See: https://tailwindcss.com/docs/customizing-colors#color-palette-reference
    colors,
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
    },
  },

  /*
   * Variants configuration
   * See: https://tailwindcss.com/docs/configuring-variants
   */
  variants: {
    extend: {
      outline: ["focus-visible"],
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOpacity: ["focus-visible"],
    },
  },

  /*
   * Plugins configuration
   * See: https://tailwindcss.com/docs/plugins
   */
  plugins: [],

  /**
   * PurgeCSS configuration
   * See: https://tailwindcss.com/docs/optimizing-for-production
   */
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.ts",
      "nuxt.config.ts",
    ],
  },
}
