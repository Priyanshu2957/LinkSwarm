import React from 'react'

const Box = ({children}) => {
  return (
    <div className=" bg-white m-6 p-4 shadow">
        {children}
    </div>
  )
}

export default Box