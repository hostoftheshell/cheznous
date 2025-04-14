const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  plugins: {
    autoprefixer: {},
    "css-declaration-sorter": {
      order: "smacss", // Alternatives: 'concentric-css', 'alphabetical'
    },
    ...(isProduction && {
      cssnano: {
        preset: "default",
      },
    }),
  },
};
