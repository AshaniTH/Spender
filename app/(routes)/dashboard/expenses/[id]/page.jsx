"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import BudgetItem from '../../budgets/_components/BudgetItem'

function ExpensesScreen() {
  const { user } = useUser()
  const routeParams = useParams()
  const id = routeParams?.id
  const [budget, setBudget] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return
    if (!id) return
    fetchBudget()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id])

  const fetchBudget = async () => {
    setLoading(true)
    setError(null)
    try {
      const email = encodeURIComponent(user.primaryEmailAddress.emailAddress)
      const res = await fetch(`/api/budgets/${encodeURIComponent(id)}`)
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to fetch budgets')
      }
      const data = await res.json()
      // API returns { success: true, row }
      const found = data?.row ?? null
      if (!found) {
        setError('Budget not found')
        setBudget(null)
      } else {
        setBudget(found)
      }
    } catch (err) {
      console.error(err)
      setError(err?.message ?? String(err))
      setBudget(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!budget) return <div className="p-4">No budget selected</div>

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold">My Expenses</h2>
      <div>
        <BudgetItem budget={budget} />
      </div>
     
    </div>
  )
}

export default ExpensesScreen