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

export const RegisterModal = () => {
   const [isLoading, setIsLoading] = useState(false)

   const registerModal = useRegisterModal()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: { name: '', email: '', password: '' },
      mode: 'all',
      reValidateMode: 'onChange',
      criteriaMode: 'all',
   })

   const onSubmit: SubmitHandler<FieldValues> = useCallback(
      (data) => {
         setIsLoading(true)

         axios
            .post('/api/register', data)
            .then(() => {
               registerModal.onClose()
               toast.success('Conta criada com sucesso.')
            })
            .catch((error) => {
               console.error(error)
               toast.error('Alguma coisa parece estar errada.')
            })
            .finally(() => {
               setIsLoading(false)
            })
      },
      [registerModal]
   )

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Heading title="Bem-vindo ao Airbnb" subtitle="Crie uma conta!" />
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
            id="name"
            label="Nome"
            type="text"
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
         isOpen={registerModal.isOpen}
         title="Cadastrar-se"
         actionLabel="Continuar"
         onClose={registerModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   )
}
