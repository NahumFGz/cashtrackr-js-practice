import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { validateToken } from '@/actions/validate-token-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>
}

export default function ValidateTokenForm({
  setIsValidToken,
}: ValidateTokenFormProps) {
  const [token, setToken] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const validateTokenInput = validateToken.bind(null, token)
  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: '',
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error))
    }

    if (state.success) {
      toast.success(state.success)
      setIsValidToken(true)
    }
  }, [state, setIsValidToken])

  useEffect(() => {
    if (isComplete) {
      dispatch()
    }
  }, [isComplete, dispatch])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
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
        <PinInputField className='h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white' />
        <PinInputField className='h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white' />
        <PinInputField className='h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white' />
        <PinInputField className='h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white' />
        <PinInputField className='h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white' />
        <PinInputField className='h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white' />
      </PinInput>
    </div>
  )
}
