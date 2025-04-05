import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const verifySession = async () => {
  const token = cookies().get('CASHTRACKR_TOKEN')?.value
  if (!token) {
    redirect('auth/login')
  }

  console.log('Verify session: ', token)
}
