'use client'
import handleFormSubmit from '@/app/actions/handleFormSubmit'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import SubmitButton from '../buttons/SubmitButton'

const UsernameForm = ({desiredUsername}) => {
    const [Taken, setTaken] = useState(false);
    const handleSubmit = async(formData)=>{
        const result = await handleFormSubmit(formData)
        if(result === false){
            setTaken(true)
        }
        else{
            setTaken(false)
            redirect('/account?created='+ formData.get('username'));
        }
    }
  return (
    <div>
        <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>
      <p className="text-center mb-6 text-gray-500">
        Choose your username
      </p>
      <div className="max-w-xs mx-auto">
        <input
          name="username"
          className="block p-2 mx-auto border w-full text-center"
          defaultValue={desiredUsername}
          type="text"
          placeholder="username" />
        {Taken && (
            <h2 className=' text-red-700 bg-red-300 border mt-1 font-bold rounded-full text-center'>This username is not available!!</h2>
        )}
        <SubmitButton>
            <span>Claim Your Username</span>
            <FontAwesomeIcon icon={faArrowRight} className='w-4' />
        </SubmitButton>
            
      </div>
    </form>
    </div>
  )
}

export default UsernameForm