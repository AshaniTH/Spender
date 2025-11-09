import { pgTable, serial, varchar, timestamp, integer, numeric } from 'drizzle-orm/pg-core'

export const budgets = pgTable('budgets', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
	icon: varchar('icon', { length: 100 }),
	created_by: varchar('created_by', { length: 255 }).notNull(),
	created_at: timestamp('created_at').defaultNow(),
})

export const Expenses = pgTable('expenses',{	
	id:serial('id').primaryKey(),
	name:varchar('name', { length: 255 }).notNull(),
	amount:numeric('amount', { precision: 10, scale: 2 }).notNull(),
	budgetId:integer('budgetId').references(()=>budgets.id),
	created_by: varchar('created_by', { length: 255 }).notNull(),
	

})