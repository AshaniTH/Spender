import { db } from '@/utils/dbConfig'
import { budgets, Expenses } from '@/utils/schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.amount || !body?.created_by) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const result = await db.insert(budgets).values({
      name: body.name,
      amount: String(body.amount),
      icon: body.icon || null,
      created_by: body.created_by,
    }).returning();

    return new Response(JSON.stringify({ success: true, result }), { status: 201 });
  } catch (err) {
    console.error('API /api/budgets POST error:', err);
    return new Response(JSON.stringify({ message: err?.message || 'Internal Server Error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const id = url.searchParams.get('id');

    if (!email) {
      return new Response(JSON.stringify({ message: 'Missing email query param' }), { status: 400 });
    }

    // Build base query selecting explicit columns and aggregates
    let query = db
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
      .where(eq(budgets.created_by, email))

    // If id provided, validate and filter by id
    if (id) {
      const numericId = Number(id)
      if (Number.isNaN(numericId)) {
        return new Response(JSON.stringify({ message: 'Invalid id param' }), { status: 400 })
      }
      query = query.where(eq(budgets.id, numericId))
    }

    const rows = await query.groupBy(budgets.id, budgets.name, budgets.icon, budgets.amount, budgets.created_by, budgets.created_at)

    return new Response(JSON.stringify({ success: true, rows }), { status: 200 })
  } catch (err) {
    console.error('API /api/budgets GET error:', err);
    return new Response(JSON.stringify({ message: err?.message || 'Internal Server Error' }), { status: 500 });
  }
}
