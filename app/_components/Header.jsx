"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs';

function Header() {
    const {user,isSignedIn} = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
        <div className='flex items-center'><Image src="/logo.svg" alt="Logo" width={40} height={20}  />
    <span className='text-2xl font-extrabold text-green-500'>Spender</span></div>
    {isSignedIn? 
    <UserButton /> :
    <Button>Get Started</Button>}
    </div>
  )
}

export default Header