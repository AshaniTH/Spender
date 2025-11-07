import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <div>
        <section className='bg-gray-50 flex items-center flex-col'>
  <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
        Manage Your<strong className="text-primary"> Expense</strong>{" "}
        <strong className="text-primary"> Control</strong>{" "}
        Your Money
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
       Start creating your budjet and save ton of money
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <a className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-green-700" href="/sign-in">
          Get Started
        </a>

        <a className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-green-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white" href="#">
          Learn More
        </a>
      </div>
    </div>
  </div>
  <div className='mx-auto max-w-7xl px-4 py-8'>
  </div>
  <Image src="/dashboard.jpg" alt="dashboard" 
  width={1000}
  height={700}
  className="-mt-1 rounded-xl border-2" />
</section>
    </div>
  )
}

export default Hero