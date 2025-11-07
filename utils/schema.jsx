import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'

export const budgets = pgTable('budgets', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	amount: varchar('amount', { length: 100 }).notNull(),
	icon: varchar('icon', { length: 100 }),
	created_by: varchar('created_by', { length: 255 }).notNull(),
	created_at: timestamp('created_at').defaultNow(),
})


