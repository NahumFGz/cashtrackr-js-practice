'use server'

import getToken from '@/src/auth/token'
import {
  Budget,
  ErrorResposeSchema,
  PasswordValidationSchema,
  SuccessSchema,
} from '@/src/schemas'
import { revalidatePath } from 'next/cache'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function deleteBudget(
  budgetId: Budget['id'],
  prevState: ActionStateType,
  formData: FormData
) {
  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get('password')
  )

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  //! Comprobar password
  const token = getToken()
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
  const checkPasswordReq = await fetch(checkPasswordUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: currentPassword.data,
    }),
  })

  const checkPasswordReqJson = await checkPasswordReq.json()
  if (!checkPasswordReq.ok) {
    const { error } = ErrorResposeSchema.parse(checkPasswordReqJson)
    return {
      errors: [error],
      success: '',
    }
  }

  //! Eliminar el presupuesto
  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
  const deleteBudgetReq = await fetch(deleteBudgetUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const deleteBudgetJson = await deleteBudgetReq.json()
  if (!deleteBudgetReq.ok) {
    const { error } = ErrorResposeSchema.parse(deleteBudgetJson)
    return {
      errors: [error],
      success: '',
    }
  }

  revalidatePath('/admin')
  const success = SuccessSchema.parse(deleteBudgetJson)
  return {
    errors: [],
    success: success,
  }
}
