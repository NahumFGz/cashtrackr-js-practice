import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CashTrackr - Iniciar Sesion',
  description: 'CashTrackr - Iniciar Sesion',
}

export default function LoginPage() {
  return (
    <>
      <h1 className='font-black text-6xl text-purple-950'>Iniciar Sesion</h1>
      <p className='text-3xl font-bold'>
        {' '}
        y controla tus <span className='text-amber-500'> finanzas</span>
      </p>

      <LoginForm />
    </>
  )
}
