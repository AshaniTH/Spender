"use client"
import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'

function DashboardLayout({children}) {

  const {user} = useUser();

  useEffect(()=>{
    user&&checkUserBudgets();
  },[user])
const checkUserBudgets = async () => {
  const result = await db.select().from(budgets)
  .where(eq(budgets.created_by,user?.primaryEmailAddress?.emailAddress))

  console.log(result);
  if(result ?.length==0){
    router.replace('/dashboard/budgets')
  }
}

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