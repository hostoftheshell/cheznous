module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["> 1%", "last 2 versions", "not dead"],
    }),
    require("css-declaration-sorter")({
      order: "smacss",
    }),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
        },
      ],
    }),
  ],
};
