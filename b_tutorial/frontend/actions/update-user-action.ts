'use server'

import { ProfileFormSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function updateUser(
  prevState: ActionStateType,
  formData: FormData
) {
  const profile = ProfileFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })
  if (!profile.success) {
    return {
      errors: profile.error.issues.map((issue) => issue.message),
      success: '',
    }
  }
  return {
    errors: [],
    success: '',
  }
}
