'use client'
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UserForm = ({user}) => {
    const router = useRouter();
    useEffect(() => {
        if (
          'localStorage' in window
          && window.localStorage.getItem('desiredUsername')
        ) {
          const username = window.localStorage.getItem('desiredUsername');
          window.localStorage.removeItem('desiredUsername');
          redirect('/account?desiredUsername=' + username);
        }
      }, []);
    const [UserName, setUserName] = useState('');
    const handleSubmit = async(ev) =>{
        ev.preventDefault();
        if (UserName.length > 0) {
              
              if(user){
                router.push('/account?desiredUsername=' + UserName);
              }
              else{
                window.localStorage.setItem('desiredUsername', UserName);
                router.push('/login');
              }
            }
          }
  return (
    <form
    onSubmit={handleSubmit}
    className="inline-flex flex-col sm:flex-row items-center mt-7 shadow-lg shadow-black/70">
    <div className="flex items-center w-full gap-0 sm:w-auto">
      <span className="bg-white py-2 sm:py-4 pl-4 sm:pl-4 w-auto text-center sm:text-left">
        linkswarm.io/
      </span>
      <input 
        value={UserName}
        onChange={ev => setUserName(ev.target.value)}
        type="text" 
        className="py-2 sm:py-4 border-none outline-none w-full sm:w-auto"
        placeholder="username" 
      />
    </div>
    <button 
      type="submit" 
      className="bg-blue-500 text-white py-2 sm:py-4 px-4 w-full sm:w-auto mt-2 sm:mt-0">
      Join For Free
    </button>
  </form>
  
  
)
}

export default UserForm