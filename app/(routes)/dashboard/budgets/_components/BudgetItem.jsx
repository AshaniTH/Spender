"use client"
import React from 'react'
import Link from 'next/link'

function BudgetItem({ budget }) {
    const id = budget?.id

    const handleClick = () => {
        console.debug('BudgetItem clicked id:', id)
    }

    return (
        <Link href={id ? `/dashboard/expenses/${id}` : '#'} className="block" onClick={handleClick}>
            <div className="p-5 border rounded-lg gap-2 hover:shadow-sm cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl p-3 bg-green-100 rounded-full">{budget?.icon ?? '🏷️'}</div>
                        <div>
                            <div className="font-semibold">{budget?.name ?? 'Untitled'}</div>
                            <div className="text-sm text-gray-500">{(budget?.totalItem ?? 0) + ' Item'}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold">{budget?.amount ?? '-'}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BudgetItem