import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Example table - customize as needed
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Export schema for type inference
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
