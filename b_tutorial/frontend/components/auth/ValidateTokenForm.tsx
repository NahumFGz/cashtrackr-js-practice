import { PinInput, PinInputField } from '@chakra-ui/pin-input'

export default function ValidateTokenForm() {
  const handleChange = (token: string) => {}

  const handleComplete = () => {}

  return (
    <div className='flex justify-center gap-5 my-10'>
      <PinInput value={''} onChange={handleChange} onComplete={handleComplete}>
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
