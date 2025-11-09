import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'

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

    if (!email) {
      return new Response(JSON.stringify({ message: 'Missing email query param' }), { status: 400 });
    }

    const rows = await db.select().from(budgets).where(eq(budgets.created_by, email));

    return new Response(JSON.stringify({ success: true, rows }), { status: 200 });
  } catch (err) {
    console.error('API /api/budgets GET error:', err);
    return new Response(JSON.stringify({ message: err?.message || 'Internal Server Error' }), { status: 500 });
  }
}
