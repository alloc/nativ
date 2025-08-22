// @ts-nocheck
// Learn more https://docs.expo.io/guides/customizing-metro

const { getDefaultConfig } = require('expo/metro-config')

module.exports = root => {
  const config = getDefaultConfig(root)

  // Allow importing SQL files, for Drizzle migrations.
  config.resolver.sourceExts.push('sql')

  return config
}
