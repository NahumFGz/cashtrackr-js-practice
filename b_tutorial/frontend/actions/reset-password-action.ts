'use server'

import { ResetPasswordSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function resetPassword(
  token: string,
  prevstate: ActionStateType,
  formData: FormData
) {
  console.log(token)

  const resetPasswordInput = {
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)
  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  return {
    errors: [],
    success: '',
  }
}
