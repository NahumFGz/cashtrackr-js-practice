'use server'

type ActionStateType = {
  errors: string[]
}

//!El prevState cambia a una segunda posición cuando se agregó el .bind en el ConfirmAccountForm
export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {
  console.log('Desde confirmAccountServerAction')
  console.log(token)
  console.log(prevState)

  return {
    errors: [],
  }
}
