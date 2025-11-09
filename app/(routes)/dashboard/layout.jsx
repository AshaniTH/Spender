"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const res = await fetch(`/api/budgets?email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        console.error('Failed to check user budgets', await res.text());
        return;
      }

      const data = await res.json();
      const rows = data?.rows || [];

      if (rows.length === 0) {
        router.replace('/dashboard/budgets');
      }
    } catch (err) {
      console.error('checkUserBudgets error:', err);
    }
  };

  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav />
        </div>
        <div className='md:ml-64 '>
            <DashboardHeader />
            {children}
        </div>
        </div>
  )
}

export default DashboardLayout