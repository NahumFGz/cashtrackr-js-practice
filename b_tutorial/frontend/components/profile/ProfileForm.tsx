'use client'

import { User } from '@/src/schemas'

export default function ProfileForm({ user }: { user: User }) {
  return (
    <>
      <form className=' mt-14 space-y-5' noValidate>
        <div className='flex flex-col gap-5'>
          <label className='font-bold text-2xl'>Nombre</label>
          <input
            type='name'
            placeholder='Tu Nombre'
            className='w-full border border-gray-300 p-3 rounded-lg'
            name='name'
            defaultValue={user.name}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <label className='font-bold text-2xl'>Email</label>

          <input
            id='email'
            type='email'
            placeholder='Tu Email'
            className='w-full border border-gray-300 p-3 rounded-lg'
            name='email'
            defaultValue={user.email}
          />
        </div>

        <input
          type='submit'
          value='Guardar Cambios'
          className='bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer'
        />
      </form>
    </>
  )
}
