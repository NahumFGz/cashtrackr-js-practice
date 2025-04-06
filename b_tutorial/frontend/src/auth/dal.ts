import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserSchema } from '../schemas'

export const verifySession = cache(async () => {
  const token = cookies().get('CASHTRACKR_TOKEN')?.value
  if (!token) {
    redirect('auth/login')
  }

  //Validar token
  const url = `${process.env.API_URL}/auth/user`
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const session = await req.json()
  const result = UserSchema.safeParse(session)

  if (!result.success) {
    redirect('/auth/login')
  }

  return {
    user: result.data,
    isAuth: true,
  }
})
