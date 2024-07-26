'use client'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const LoginWithGithub = () => {
  return (
    <button onClick={()=>{}} className='bg-gray-600 text-white text-center w-full py-4 flex gap-3 items-center justify-center mt-4'>
                <FontAwesomeIcon icon={faGithub} className='h-6'/>
                <span className=' font-bold text-lg'>Sign In with Github</span>
            </button>
  )
}

export default LoginWithGithub