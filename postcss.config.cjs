const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "not dead"
      ]
    }),
    require('css-declaration-sorter')({
      order: 'smacss'
    }),
    ...(isProduction ? [
      require('cssnano')({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true
        }]
      })
    ] : [])
  ]
};
