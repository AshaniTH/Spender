"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {

  const [budgetList, setBudgetList] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getBudgetList(user.primaryEmailAddress.emailAddress)
    }

    const onUpdate = () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        getBudgetList(user.primaryEmailAddress.emailAddress)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('budgets:updated', onUpdate)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('budgets:updated', onUpdate)
      }
    }
  }, [user])

  const getBudgetList = async (email) => {
    try {
      const res = await fetch(`/api/budgets?email=${encodeURIComponent(email)}`)
      if (!res.ok) {
        console.error('Failed to fetch budgets', await res.text())
        setBudgetList([])
        return
      }
  const data = await res.json()
  // debug: log API response
  console.debug('GET /api/budgets response:', data)
  // API returns { success: true, rows }
  setBudgetList(data?.rows ?? [])
    } catch (err) {
      console.error('Error fetching budgets', err)
      setBudgetList([])
    }
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget />
        {budgetList.length === 0 && (
          <div className='p-4 text-sm text-gray-500'>No budgets yet</div>
        )}
        {budgetList.map((budget) => (
          <BudgetItem key={budget.id ?? budget.name} budget={budget} />
        ))}
      </div>
    </div>
  )
}

export default BudgetList