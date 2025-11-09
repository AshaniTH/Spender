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
            <div className="p-4 border rounded-lg bg-white hover:shadow-sm cursor-pointer">
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

                <div className="mt-3">
                    <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
                        <div>{(budget?.totalSpend ?? 0) + ' Spent'}</div>
                        <div>{(budget?.amount && budget?.totalSpend != null) ? (Number(budget.amount) - Number(budget.totalSpend)) : '-'} Remaining</div>
                    </div>
                    <div className="w-full bg-green-100 h-2 rounded-full">
                        <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: budget?.amount && budget?.totalSpend != null ? `${Math.min(100, Math.round((Number(budget.totalSpend) / Number(budget.amount || 1)) * 100))}%` : '0%' }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BudgetItem