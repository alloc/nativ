import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import * as schema from './schema'

const sql = openDatabaseSync('app.db')

/**
 * Local database powered by expo-sqlite.
 */
export const db = drizzle(sql, { schema })
