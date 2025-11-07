import React from 'react'
import Image from 'next/image'
import { LayoutDashboardIcon, PiggyBank, ReceiptText, ShieldCheck, User  } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboardIcon,
    },
    {
      id:2,
      name:'Budgets',
      icon: PiggyBank,
    },
    {
      id:3,
      name:'Expenses',
      icon: ReceiptText,
    },
    {
      id:4,
      name:'Upgrade',
      icon: ShieldCheck,
    }

  ]
  return (

    


    <div className='h-screen border shadow-sm'>
       
              <div className='p-5 flex items-center'><Image src="/logo.svg" alt="Logo" width={40} height={20}  />
          <span className='text-2xl font-extrabold text-green-500'>Spender</span>
          </div>

          {/* Menu List */}
          <div>
            {menuList.map((menu,Index)=>(
              <h2 className='flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-green-700 hover:bg-green-200 '>
                <menu.icon/>
                {menu.name}
              </h2>
            ))}
            
          </div>
          <div className='fixed bottom-10 p-5 flex gap-2 items-center text-gray-500 font-medium'>
            <UserButton/>
            Profile
          </div>
         

    
    </div>
    
  )
}

export default SideNav