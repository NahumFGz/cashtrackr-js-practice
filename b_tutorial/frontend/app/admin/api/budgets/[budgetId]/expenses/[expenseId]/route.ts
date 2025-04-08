import { verifySession } from '@/src/auth/dal'

export async function GET() {
  await verifySession()

  return Response.json('Hola Mundo')
}
