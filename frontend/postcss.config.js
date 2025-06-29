module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {
      config: './tailwind.config.ts'
    },
    'autoprefixer': {},
    'postcss-modules': {
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
  },
};
