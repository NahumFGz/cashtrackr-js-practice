'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ErrorResposeSchema, LoginSchema } from '@/src/schemas'

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
  if (!req.ok) {
    const { error } = ErrorResposeSchema.parse(json)

    return {
      errors: [error],
    }
  }

  //! Setear Cookies
  cookies().set({
    name: 'CASHTRACKR_TOKEN',
    value: json,
    httpOnly: true, //Solo el servidor puede acceder a la cookie
    path: '/', //Indica en que rutas del proyecto es valida
  })

  redirect('/admin')

  //! Si la autentificación es correcta ya no es necesario porque el redirect me lleva a otro lado y corta el flujo
  //   return {
  //     errors: [],
  //   }
}
