'use client'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogOut = () => {
  return (
    <button className='flex gap-2 items-center border p-2 px-4 shadow' onClick={()=> signOut({ callbackUrl: '/login' })}>
        <span className=' hidden md:block'>Logout</span>
        <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )
}

export default LogOut