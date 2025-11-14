"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function AddExpense() {

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'></h2>
        <Input placeholder='Expense Name' className='w-full mb-2' 
        onChange={(e) => setName(e.target.value)}
        />

      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'></h2>
        <Input placeholder='Expense Amount' className='w-full mb-2' 
        onChange={(e) => setAmount(e.target.value)}
        />

      </div>
      <Button disabled={!(name && amount)} className='mt-2 w-full'>Add Expense</Button>

    </div>
  )
}

export default AddExpense