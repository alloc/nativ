// @ts-nocheck
module.exports = () => {
  return {
    presets: ['babel-preset-expo'],
    plugins: [['inline-import', { extensions: ['.sql'] }]],
  }
}
