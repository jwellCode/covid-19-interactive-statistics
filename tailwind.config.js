/*
 * Tailwind CSS configuration
 *
 * Docs: https://tailwindcss.com/docs/configuration/
 * Default: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  // See: https://tailwindcss.com/docs/upcoming-changes/
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  theme: {},
  variants: {
    outline: ["responsive", "focus", "focus-visible"],
    boxShadowOutline: ["responsive", "hover", "focus", "focus-visible"],
    boxShadowOutlineOpacity: ["responsive", "hover", "focus", "focus-visible"],
  },
  plugins: [require("tailwindcss-box-shadow-outline-extended")],
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
