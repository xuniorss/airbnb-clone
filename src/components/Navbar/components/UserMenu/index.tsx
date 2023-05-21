'use client'

import { Avatar } from '@/components/Avatar'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import useRentModal from '@/hooks/useRentModal'
import { SafeUser } from '@/types/user'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MenuItem } from './components/MenuItem'

type UserMenuProps = {
   currentUser?: SafeUser | null
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const router = useRouter()

   const registerModal = useRegisterModal()
   const loginModal = useLoginModal()
   const rentModal = useRentModal()

   const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value)
   }, [])

   const onRent = useCallback(() => {
      if (!currentUser) return loginModal.onOpen()

      rentModal.onOpen()
   }, [currentUser, loginModal, rentModal])

   return (
      <div className="relative">
         <div className="flex flex-row items-center gap-3">
            <div
               onClick={onRent}
               className="trnasition hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold hover:bg-neutral-100 md:block"
            >
               Anuncie seu espaço no Airbnb
            </div>
            <div
               onClick={toggleOpen}
               className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
            >
               <AiOutlineMenu />
               <div className="hidden md:block">
                  <Avatar src={currentUser?.image} />
               </div>
            </div>
         </div>
         {isOpen && (
            <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
               <div className="flex cursor-pointer flex-col">
                  {currentUser && (
                     <>
                        <MenuItem
                           onClick={() => router.push('/trips')}
                           label="Minhas viagens"
                        />
                        <MenuItem onClick={() => {}} label="Meus favoritos" />
                        <MenuItem onClick={() => {}} label="Minhas reservas" />
                        <MenuItem
                           onClick={() => {}}
                           label="Minhas propriedades"
                        />
                        <MenuItem onClick={onRent} label="Airbnb meu espaço" />

                        <hr />

                        <MenuItem
                           onClick={() => signOut()}
                           label="Desconectar"
                        />
                     </>
                  )}
                  {!currentUser && (
                     <>
                        <MenuItem
                           onClick={registerModal.onOpen}
                           label="Cadastrar-se"
                        />
                        <MenuItem onClick={loginModal.onOpen} label="Entrar" />
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   )
}
