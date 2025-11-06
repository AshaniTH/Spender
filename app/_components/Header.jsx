import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
        <div className='flex items-center'><Image src="/logo.svg" alt="Logo" width={40} height={20}  />
    <span className='text-2xl text-bold text-green-500'>Spender</span></div>
    <Button>Get Started</Button>
    </div>
  )
}

export default Header