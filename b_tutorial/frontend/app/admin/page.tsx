import getToken from '@/src/auth/token'
import { BudgetsAPIResponseSchema } from '@/src/schemas'
import { formatCurrency } from '@/src/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CashTrackr - Panel de administración',
  description: 'CashTrackr - Panel de administración',
}

//! Los componentes asincronos por ahora solo son client components xq next usa versiones canary de react
//! Los server actions son para mutaciones -> CREAR, ELIMINAR, EDITAR
//* Para obtener datos es otra

async function getUserBudgets() {
  const token = getToken()
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
  console.log(budgets)

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
      {budgets.length ? (
        <ul
          role='list'
          className='divide-y divide-gray-300 border shadow-lg mt-10 '
        >
          {budgets.map((budget) => (
            <li key={budget.id} className='flex justify-between gap-x-6 p-5 '>
              <div className='flex min-w-0 gap-x-4'>
                <div className='min-w-0 flex-auto space-y-2'>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    <Link
                      href={`/admin/budgets/${budget.id}`}
                      className='cursor-pointer hover:underline text-2xl font-bold'
                    >
                      {budget.name}
                    </Link>
                  </p>
                  <p className='text-xl font-bold text-amber-500'>
                    {formatCurrency(+budget.amount)}
                  </p>
                  <p className='text-gray-500  text-sm'></p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-x-6'></div>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No hay presupuestos aún{' '}
          <Link
            href={'/admin/budgets/new'}
            className='text-purple-950 font-bold'
          >
            comienza creando uno
          </Link>
        </p>
      )}
    </>
  )
}
