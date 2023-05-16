'use client'

import { Avatar } from '@/components/Avatar'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import useRentModal from '@/hooks/useRentModal'
import { SafeUser } from '@/types/user'
import { signOut } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MenuItem } from './components/MenuItem'

type UserMenuProps = {
   currentUser?: SafeUser | null
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
   const [isOpen, setIsOpen] = useState(false)

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
               className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 trnasition cursor-pointer"
            >
               Anuncie seu espaço no Airbnb
            </div>
            <div
               onClick={toggleOpen}
               className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
               <AiOutlineMenu />
               <div className="hidden md:block">
                  <Avatar src={currentUser?.image} />
               </div>
            </div>
         </div>
         {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
               <div className="flex flex-col cursor-pointer">
                  {currentUser && (
                     <>
                        <MenuItem onClick={() => {}} label="Minhas viagens" />
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
