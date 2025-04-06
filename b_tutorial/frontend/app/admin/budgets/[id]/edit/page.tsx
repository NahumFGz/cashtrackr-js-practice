import getToken from '@/src/auth/token'

const getBudget = async (budgetId: string) => {
  const token = getToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}`
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await req.json()
  if (!req.ok) {
  }

  return json
}

export default async function EditBudgetPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  getBudget(id)
  return (
    <>
      <p>EditBudgetPage</p>
    </>
  )
}
