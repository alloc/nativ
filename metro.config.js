// @ts-nocheck
// Learn more https://docs.expo.io/guides/customizing-metro

const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Allow importing SQL files, for Drizzle migrations.
config.resolver.sourceExts.push('sql')

// Enable resolution of package "exports" fields.
config.resolver.unstable_enablePackageExports = true

module.exports = config
