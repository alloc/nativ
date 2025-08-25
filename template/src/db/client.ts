import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import { relations } from './relations'
import * as schema from './schema'

/**
 * Local database powered by expo-sqlite.
 */
export const db = drizzle(openDatabaseSync('app.db'), {
  schema,
  relations,
  casing: 'snake_case',
})
