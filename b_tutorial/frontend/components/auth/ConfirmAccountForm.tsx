'use client'

import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

export default function ConfirmAccountForm() {
  const [isComplete, setIsComplete] = useState(false)
  const [token, setToken] = useState('')

  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
  })

  useEffect(() => {
    if (isComplete) {
      dispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete])

  const handleChange = (token: string) => {
    setToken(token)
    console.log(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
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
