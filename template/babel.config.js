module.exports = api => {
  api.cache(true)
  return {
    presets: ['nativ/babel-preset'],
  }
}
