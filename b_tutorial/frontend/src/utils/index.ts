export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(quantity)
}

//!Otra opción es usar la librería date-fns
export function formatDate(isoString: string) {
  const date = new Date(isoString)

  const formater = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return formater.format(date)
}
