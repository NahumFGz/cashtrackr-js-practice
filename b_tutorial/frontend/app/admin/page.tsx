import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CashTrackr - Panel de administración',
  description: 'CashTrackr - Panel de administración',
}

export default async function AdminPage() {
  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-purple-950 my-5'>
            Mis Presupuestos
          </h1>
          <p className='text-xl font-bold'>
            Maneja y administra tus {''}
            <span className='text-amber-500'>presupuestos</span>
          </p>
        </div>
        <Link
          href={'/admin/budgets/new'}
          className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Crear Presupuesto
        </Link>
      </div>
    </>
  )
}
