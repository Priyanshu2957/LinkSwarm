import LoginWithFacebook from '@/components/buttons/LoginWithFacebook'
import LoginWithGithub from '@/components/buttons/LoginWithGithub'
import LoginWithGoogle from '@/components/buttons/LoginWithGoogle'
import { getServerSession } from 'next-auth'
import React from 'react'

import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Login = async() => {

  const session = await getServerSession(authOptions);
  if(!!session){  
    redirect('/account');
  }
  return (
    
    <main className=' bg-login-back h-screen'>
    <div className=" backdrop-blur-[8px] bg-black/20 h-screen w-full ">
    <div className='p-6 max-w-4xl mx-auto '>
        <div className='bg-white border p-4 max-w-md rounded-md mx-auto mt-40'>
            <h1 className=' text-4xl font-bold text-center mb-9'>Sign In</h1>
            <LoginWithGoogle  />
            <LoginWithFacebook />
            <LoginWithGithub />
        </div>

    </div>
    </div>
    </main>
  )
}

export default Login