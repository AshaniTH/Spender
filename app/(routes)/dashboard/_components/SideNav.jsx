import React from 'react'
import Image from 'next/image'

function SideNav() {
  return (
    <div className='h-screen'>
       
              <div className='p-5 flex items-center'><Image src="/logo.svg" alt="Logo" width={40} height={20}  />
          <span className='text-2xl font-extrabold text-green-500'>Spender</span>
          </div>
          
         

    
    </div>
    
  )
}

export default SideNav