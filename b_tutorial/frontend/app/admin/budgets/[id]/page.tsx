import AddExpenseButton from '@/components/expenses/AddExpenseButton'
import ModalContainer from '@/components/ui/ModalContainer'
import { getBudget } from '@/src/services/budget'
import { Metadata } from 'next'

type budgetParamsType = {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const budget = await getBudget(params.id)

  return {
    title: `CashTrackr - ${budget.name}`,
    description: `CashTrackr - ${budget.name}`,
  }
}

export default async function BugetDetailsPage({ params }: budgetParamsType) {
  const budget = await getBudget(params.id)
  console.log(budget)

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-black text-4xl text-purple-950'>{budget.name}</h1>
          <p className='text-xl font-bold'>
            Administra tus {''} <span className='text-amber-500'>gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      <ModalContainer />
    </>
  )
}
