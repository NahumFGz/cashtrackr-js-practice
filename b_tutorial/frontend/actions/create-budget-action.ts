'use server'

import { DraftBudgetSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function createBudget(
  prevState: ActionStateType,
  formData: FormData
) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
  })
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  return {
    errors: [],
    success: '',
  }
}
