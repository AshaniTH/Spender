"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutDashboardIcon, PiggyBank, ReceiptText, ShieldCheck, User  } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboardIcon,
      path: '/dashboard'
    },
    {
      id:2,
      name:'Budgets',
      icon: PiggyBank,
      path:'/dashboard/budgets'
    },
    {
      id:3,
      name:'Expenses',
      icon: ReceiptText,
      path:'/dashboard/expenses/{"id"}'
    },
    {
      id:4,
      name:'Upgrade',
      icon: ShieldCheck,
      path:'/dashboard/upgrade'
    }

  ]

  const pathname = usePathname();
  useEffect(()=>{
    console.log("Current Path:", pathname);
  },[pathname])
  return (
   <div className='h-screen border shadow-sm'>
       
              <div className='p-5 flex items-center'><Image src="/logo.svg" alt="Logo" width={40} height={20}  />
          <span className='text-2xl font-extrabold text-green-500'>Spender</span>
          </div>

          {/* Menu List */}
          <div className='mt-5'>
            {menuList.map((menu) => {
              const Icon = menu.icon
              const isActive = pathname === menu.path
              return (
                <Link href={menu.path} key={menu.id}>
                  <h2 className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-green-700 hover:bg-green-200 ${isActive ? 'text-green-700 bg-green-200' : ''}`}>
                    <Icon />
                    {menu.name}
                  </h2>
                </Link>
              )
            })}

          </div>

          <div className='fixed bottom-10 p-5 flex gap-2 items-center text-gray-500 font-medium'>
            <UserButton/>
            Profile
          </div>
         

    
    </div>
    
  )
}

export default SideNav