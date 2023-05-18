'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Inputs'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { Modal } from '..'
import { Heading } from '../components/Heading'

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

   const toggle = useCallback(() => {
      loginModal.onClose()
      registerModal.onOpen()
   }, [loginModal, registerModal])

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
      <div className="mt-3 flex flex-col gap-4">
         <hr />
         <Button
            outline
            label="Continuar com Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
         />

         <Button
            outline
            label="Continuar com Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
         />

         <div className="mt-4 text-center font-light text-neutral-500">
            <div className="flex flex-row items-center justify-center gap-2">
               <div>Primeira vez usando o Airbnb?</div>
               <div
                  className="cursor-pointer text-neutral-800 hover:underline"
                  onClick={toggle}
               >
                  Crie uma conta
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
