'use client'

import { CategoryInput } from '@/components/Inputs/CategoryInput'
import { CountrySelected } from '@/components/Inputs/CountrySelected'
import { categories } from '@/components/Navbar/components/Categories/constants'
import useRentModal from '@/hooks/useRentModal'
import { useCallback, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Modal } from '..'
import { Heading } from '../components/Heading'
import dynamic from 'next/dynamic'
import { Counter } from '@/components/Inputs/Counter'

enum STEPS {
   CATEGORY = 0,
   LOCATION = 1,
   INFO = 2,
   IMAGES = 3,
   DESCRIPTION = 4,
   PRICE = 5,
}

export const RentModal = () => {
   const [step, setStep] = useState(STEPS.CATEGORY)

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
      reset,
   } = useForm<FieldValues>({
      defaultValues: {
         category: '',
         location: null,
         guestCount: 1,
         roomCount: 1,
         bathroomCount: 1,
         imageSrc: '',
         price: 1,
         title: '',
         description: '',
      },
   })

   const category = watch('category')
   const location = watch('location')
   const guestCount = watch('guestCount')
   const roomCount = watch('roomCount')
   const bathroomCount = watch('bathroomCount')

   const Map = useMemo(
      () => dynamic(() => import('@/components/Map'), { ssr: false }),
      [location]
   )

   const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
         shouldValidate: true,
         shouldDirty: true,
         shouldTouch: true,
      })
   }

   const rentModal = useRentModal()

   const onBack = useCallback(() => {
      setStep((value) => value - 1)
   }, [])

   const onNext = useCallback(() => {
      setStep((value) => value + 1)
   }, [])

   const actionLabel = useMemo(() => {
      if (step === STEPS.PRICE) return 'Criar'
      return 'Próximo'
   }, [step])

   const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.CATEGORY) return undefined
      return 'Voltar'
   }, [step])

   let bodyContent = (
      <div className="flex flex-col gap-8">
         <Heading
            title="Qual destas opções melhor descreve o seu lugar?"
            subtitle="Escolha uma categoria"
         />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
               <div key={item.label}>
                  <CategoryInput
                     onClick={(category) =>
                        setCustomValue('category', category)
                     }
                     selected={category === item.label}
                     label={item.label}
                     icon={item.icon}
                  />
               </div>
            ))}
         </div>
      </div>
   )

   if (step === STEPS.LOCATION) {
      bodyContent = (
         <div className="flex flex-col gap-8">
            <Heading
               title="Onde está localizado o seu lugar?"
               subtitle="Ajude os hóspedes a encontrar você!"
            />

            <CountrySelected
               value={location}
               onChange={(value) => setCustomValue('location', value)}
            />

            <Map center={location?.latlng} />
         </div>
      )
   }

   if (step === STEPS.INFO) {
      bodyContent = (
         <div className="flex flex-col gap-8 select-none">
            <Heading
               title="Diga algumas informações básicas sobre seu lugar"
               subtitle="Que comodidades você tem?"
            />

            <Counter
               title="Hóspedes"
               subtitle="Quantos hóspedes você permite?"
               value={guestCount}
               onChange={(value) => setCustomValue('guestCount', value)}
            />
            <hr />

            <Counter
               title="Quartos"
               subtitle="Quantos quartos você tem?"
               value={roomCount}
               onChange={(value) => setCustomValue('roomCount', value)}
            />
            <hr />

            <Counter
               title="Banheiros"
               subtitle="Quantos banheiros você tem?"
               value={bathroomCount}
               onChange={(value) => setCustomValue('bathroomCount', value)}
            />
         </div>
      )
   }

   return (
      <Modal
         isOpen={rentModal.isOpen}
         onClose={rentModal.onClose}
         onSubmit={onNext}
         actionLabel={actionLabel}
         secondaryActionLabel={secondaryActionLabel}
         secondayAction={step === STEPS.CATEGORY ? undefined : onBack}
         title="Anuncie seu espaço no Airbnb!"
         body={bodyContent}
      />
   )
}
