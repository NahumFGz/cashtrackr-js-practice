'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { confirmAccount } from '@/actions/confirm-account-action'

export default function ConfirmAccountForm() {
  const router = useRouter()
  const [isComplete, setIsComplete] = useState(false)
  const [token, setToken] = useState('')

  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: '',
  })

  useEffect(() => {
    if (isComplete) {
      dispatch()
    }
  }, [isComplete, dispatch])

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error)
      })
    }

    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/auth/login')
        },
      })
    }
  }, [router, state])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <>
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
    </>
  )
}
