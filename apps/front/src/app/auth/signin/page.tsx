
import React from 'react'
import  Link  from 'next/link'
export default function SignInPage() {
  return (
    <div className='bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center'>
        <h1 className='text-center text-2xl font-bold mb-4'>Sign In Page</h1>
        {/* Put SignIn form here */}
        <Link href={'/auth/forgot'}>Forgot Your Password ?</Link>
    </div>
  )
}
