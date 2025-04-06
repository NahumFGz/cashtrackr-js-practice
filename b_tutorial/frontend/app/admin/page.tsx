import { BudgetsAPIResponseSchema } from '@/src/schemas'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CashTrackr - Panel de administración',
  description: 'CashTrackr - Panel de administración',
}

//! Los componentes asincronos por ahora solo son client components xq next usa versiones canary de react
//! Los server actions son para mutaciones -> CREAR, ELIMINAR, EDITAR
//* Para obtener datos es otra

async function getUserBudgets() {
  const token = cookies().get('CASHTRACKR_TOKEN')?.value
  const url = `${process.env.API_URL}/budgets`

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const json = await req.json()
  const budgets = BudgetsAPIResponseSchema.parse(json)

  return budgets
}

export default async function AdminPage() {
  const budgets = await getUserBudgets()

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
