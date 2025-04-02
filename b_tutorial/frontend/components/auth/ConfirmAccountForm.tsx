'use client'

import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from 'react'

export default function ConfirmAccountForm() {
  const [token, setToken] = useState('')

  const handleChange = (token: string) => {
    setToken(token)
    console.log(token)
  }

  const handleComplete = () => {
    console.log('Llegaste al final')
  }

  return (
    <div className='flex justify-center gap-5 my-10'>
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className='text-black h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white ' />
        <PinInputField className='text-black h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white ' />
        <PinInputField className='text-black h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white ' />
        <PinInputField className='text-black h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white ' />
        <PinInputField className='text-black h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white ' />
        <PinInputField className='text-black h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white ' />
      </PinInput>
    </div>
  )
}
