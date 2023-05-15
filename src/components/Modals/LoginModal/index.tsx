'use client'

import { Input } from '@/components/Inputs'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Modal } from '..'
import { Heading } from '../components/Heading'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import useLoginModal from '@/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const LoginModal = () => {
   const [isLoading, setIsLoading] = useState(false)

   const loginModal = useLoginModal()
   const registerModal = useRegisterModal()

   const router = useRouter()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: { email: '', password: '' },
      mode: 'all',
      reValidateMode: 'onChange',
      criteriaMode: 'all',
   })

   const onSubmit: SubmitHandler<FieldValues> = useCallback(
      (data) => {
         setIsLoading(true)

         signIn('credentials', { ...data, redirect: false }).then(
            (callback) => {
               setIsLoading(false)

               if (callback?.ok) {
                  toast.success('Acessou')
                  router.refresh()
                  loginModal.onClose()
               }

               if (callback?.error) {
                  toast.error(callback.error)
               }
            }
         )
      },
      [loginModal, router]
   )

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Heading title="Bem-vindo(a) de volta" subtitle="Acesse sua conta!" />
         <Input
            id="email"
            label="Email"
            type="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />

         <Input
            id="password"
            label="Senha"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
      </div>
   )

   const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
         <hr />
         <Button
            outline
            label="Continuar com Google"
            icon={FcGoogle}
            onClick={() => {}}
         />

         <Button
            outline
            label="Continuar com Github"
            icon={AiFillGithub}
            onClick={() => {}}
         />

         <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row items-center justify-center gap-2">
               <div>Já tem uma conta?</div>
               <div
                  className="text-neutral-800 cursor-pointer hover:underline"
                  onClick={registerModal.onClose}
               >
                  Acesse
               </div>
            </div>
         </div>
      </div>
   )

   return (
      <Modal
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title="Acessar"
         actionLabel="Continuar"
         onClose={loginModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   )
}
