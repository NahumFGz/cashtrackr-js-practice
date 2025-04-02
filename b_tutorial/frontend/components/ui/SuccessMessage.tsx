type SuccessMessageType = {
  children: React.ReactNode
}

export default function SuccessMessage({ children }: SuccessMessageType) {
  return (
    <>
      <p className='text-center my-4 bg-amber-500 text-white font-bold p-3 uppercase text-sm'>
        {children}
      </p>
    </>
  )
}
