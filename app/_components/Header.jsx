import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <div className='p-5 flex items-center'><Image src="/logo.svg" alt="Logo" width={40} height={20}  />
    <span className='text-2xl text-bold text-green-500'>Spender</span></div>
  )
}

export default Header