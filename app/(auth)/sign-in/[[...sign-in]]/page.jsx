import Header from '@/app/_components/Header'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <>
      <Header />
      <div className='items-center justify-center flex min-h-screen'>
          <SignIn />
      </div>
    </>
  )
}