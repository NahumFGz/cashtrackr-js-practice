'use server'

import { LoginSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
}

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const auth = LoginSchema.safeParse(loginCredentials)
  if (!auth.success) {
    return {
      errors: auth.error.errors.map((issue) => issue.message),
    }
  }

  const url = `${process.env.API_URL}/auth/login`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: auth.data.password,
      email: auth.data.email,
    }),
  })

  const json = await req.json()
  console.log(!req.ok)
  console.log(json)

  return {
    errors: [],
  }
}
