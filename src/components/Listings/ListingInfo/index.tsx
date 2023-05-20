'use client'

import { Avatar } from '@/components/Avatar'
import useCountries from '@/hooks/useCountries'
import { SafeUser } from '@/types/user'
import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'
import { ListingCategory } from '../ListingCategory'

const Map = dynamic(() => import('../../Map'), { ssr: false })

type CategoryProps = {
   icon: IconType
   label: string
   description: string
}

type ListingInfoProps = {
   user: SafeUser
   description: string
   guestCount: number
   roomCount: number
   bathroomCount: number
   category: CategoryProps | undefined
   locationValue: string
}

export const ListingInfo = ({
   user,
   description,
   guestCount,
   roomCount,
   bathroomCount,
   category,
   locationValue,
}: ListingInfoProps) => {
   const { getByValue } = useCountries()

   const coordinates = getByValue(locationValue)?.latlng

   return (
      <div className="col-span-4 flex flex-col gap-8">
         <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 text-xl font-semibold">
               <div>Hospedado por {user?.name}</div>
               <Avatar src={user?.image} />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
               <div>{guestCount} hóspedes</div>
               <div>
                  {roomCount} {roomCount <= 1 ? 'quarto' : 'quartos'}
               </div>
               <div>
                  {bathroomCount}{' '}
                  {bathroomCount <= 1 ? 'benheiro' : 'banheiros'}
               </div>
            </div>
         </div>
         <hr />
         {category && (
            <ListingCategory
               icon={category.icon}
               label={category.label}
               description={category.description}
            />
         )}
         <hr />
         <div className="text-lg font-light text-neutral-500">
            {description}
         </div>
         <hr />
         <Map center={coordinates} />
      </div>
   )
}
