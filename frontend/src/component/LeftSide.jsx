import React from 'react'
import UdhaarBook from './UdhaarBook'

const LeftSide = () => {
  return (
    <div className='cursor-pointer py-10 px-5 '>
        <h1 className='text-3xl font-bold hover:underline transition-all duration-600 ease-in'>Books :</h1>
        <UdhaarBook/>
    </div>
  )
}

export default LeftSide