
import React from 'react'

function BudgetItem({ budget }) {
  return (
    <div className='p-5 border rounded-lg gap-2 flex '>
        <div className='flex gap-2 items-center'>
            <h2 className='text-3xl p-2 bg-green-100 rounded-full'>{budget?.icon}</h2>
        </div>
        <h2 className=''>{budget?.name}</h2>
        <h2>{budget?.totalItems}Item</h2>
    </div>
  )
}

export default BudgetItem