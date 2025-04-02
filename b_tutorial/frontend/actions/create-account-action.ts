'use server'

import { RegisterSchema } from '@/src/schemas'

type ActionStateType = {
  errors: string[]
}

export async function register(prevState: ActionStateType, formData: FormData) {
  console.log(formData)

  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }
  // Validar
  const register = RegisterSchema.safeParse(registerData)

  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message)
    return {
      errors,
    }
  }
  console.log('register', register)

  // Registrar el usuario
  const url = `${process.env.API_URL}/auth/create-acount`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password,
    }),
  })

  const json = await req.json()
  console.log('json', json)

  return {
    errors: [],
  }
}
