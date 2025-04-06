'use client'
import { useState } from 'react'
import ValidateTokenForm from './ValidateTokenForm'
import ResetPasswordForm from './ResetPasswordForm'

export default function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      {!isValidToken ? (
        <ValidateTokenForm setIsValidToken={setIsValidToken} />
      ) : (
        <ResetPasswordForm />
      )}
    </>
  )
}
