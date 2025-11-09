import { db } from '@/utils/dbConfig'
import { budgets, Expenses } from '@/utils/schema'
import { eq, sql } from 'drizzle-orm'

export async function GET(req, { params }) {
  try {
    const url = new URL(req.url)
    // accept id from route params, query param, or fallback to pathname
    const id = params?.id ?? url.searchParams.get('id') ?? url.pathname.split('/').filter(Boolean).pop()
    if (!id) {
      return new Response(JSON.stringify({ message: 'Missing id param' }), { status: 400 })
    }

    const numericId = Number(id)
    if (Number.isNaN(numericId)) {
      return new Response(JSON.stringify({ message: 'Invalid id param' }), { status: 400 })
    }

    console.log('[api]/budgets/[id] - lookup id:', numericId)
    const rows = await db
      .select({
        id: budgets.id,
        name: budgets.name,
        icon: budgets.icon,
        amount: budgets.amount,
        created_by: budgets.created_by,
        created_at: budgets.created_at,
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(budgets)
      .leftJoin(Expenses, eq(budgets.id, Expenses.budgetId))
      .where(eq(budgets.id, numericId))
      .groupBy(budgets.id, budgets.name, budgets.icon, budgets.amount, budgets.created_by, budgets.created_at)

    console.log('[api]/budgets/[id] - rows found:', rows?.length ?? 0)
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Not found', rows: [] }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true, row: rows[0] }), { status: 200 })
  } catch (err) {
    console.error('API /api/budgets/[id] GET error:', err)
    return new Response(JSON.stringify({ message: err?.message || 'Internal Server Error' }), { status: 500 })
  }
}
