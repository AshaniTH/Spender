"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function AddExpense() {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'></h2>
        <Input placeholder='Expense Name' className='w-full mb-2' />
      </div>
    </div>
  )
}

export default AddExpense