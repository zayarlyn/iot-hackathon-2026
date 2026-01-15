import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const deviceTable = sqliteTable('device', {
	id: int().primaryKey({ autoIncrement: true }),
	wash_threshold: int().notNull(),
	rinse_threshold: int().notNull(),
	spin_threshold: int().notNull(),
	status: text().notNull(),
})
