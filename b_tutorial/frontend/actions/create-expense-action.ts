'use server'

import getToken from '@/src/auth/token'
import {
  Budget,
  DrafExpenseSchema,
  ErrorResposeSchema,
  SuccessSchema,
} from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export default async function createExpense(
  budgetId: Budget['id'],
  prevState: ActionStateType,
  formData: FormData
) {
  const expenseData = {
    name: formData.get('name'),
    amount: formData.get('amount'),
  }

  const expense = DrafExpenseSchema.safeParse(expenseData)
  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  //Generar gasto
  const token = getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
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
