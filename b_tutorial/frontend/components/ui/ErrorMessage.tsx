type ErrorMessageType = {
  children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageType) {
  return (
    <>
      <p className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm'>
        {children}
      </p>
    </>
  )
}
