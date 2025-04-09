import { DialogTitle } from '@headlessui/react'
import ExpenseForm from './ExpenseForm'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { DrafExpense } from '@/src/schemas'

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  const [expense, setExpense] = useState<DrafExpense>()

  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('editExpenseId')

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpense(data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <DialogTitle as='h3' className='font-black text-4xl text-purple-950 my-5'>
        Editar Gasto
      </DialogTitle>
      <p className='text-xl font-bold'>
        Edita los detalles de un {''}
        <span className='text-amber-500'>gasto</span>
      </p>
      <form
        className='bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border'
        noValidate
      >
        <ExpenseForm expense={expense} />
        <input
          type='submit'
          className='bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors'
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}
