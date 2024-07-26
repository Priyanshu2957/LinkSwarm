'use client'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const LoginWithFacebook = () => {
  return (
    <button onClick={()=>{}} className='bg-blue-500 text-white text-center w-full py-4 flex gap-3 items-center justify-center mt-4'>
                <FontAwesomeIcon icon={faFacebook} className='h-6'/>
                <span className=' font-bold text-lg'>Sign In with Facebook</span>
            </button>
  )
}

export default LoginWithFacebook