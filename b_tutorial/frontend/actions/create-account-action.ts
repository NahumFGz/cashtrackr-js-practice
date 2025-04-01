'use server'

import { RegisterSchema } from '@/src/schemas'

export async function register(formData: FormData) {
  console.log(formData)

  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }
  // Validar
  const register = RegisterSchema.safeParse(registerData)
  console.log('register', register)
  console.log('register.error', register.error)

  const error = register.error?.errors.map((error) => error.message)
  console.log('error', error)

  // Registrar el usuario
}
