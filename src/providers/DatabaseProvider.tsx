import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'

export function DatabaseProvider({
  db,
  migrations,
}: {
  db: any // Drizzle database instance
  migrations: any
}) {
  const { error } = useMigrations(db, migrations)

  if (error) {
    console.error(error)
    // Could emit an event or call an error handler
  }

  return null
}
