'use server'

import {
  ErrorResposeSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  })

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  //! Ahora q se validó el email hacer la llamada a la API
  const url = `${process.env.API_URL}/auth/forgot-password`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: forgotPassword.data.email,
    }),
  })

  const json = await req.json()

  if (!req.ok) {
    const { error } = ErrorResposeSchema.parse(json)

    return {
      errors: [error],
      success: '',
    }
  }

  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    success: success,
  }
}
