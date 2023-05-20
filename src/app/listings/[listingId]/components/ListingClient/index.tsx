'use client'

import { Container } from '@/components/Container'
import { ListingHead } from '@/components/Listings/ListingHead'
import { ListingInfo } from '@/components/Listings/ListingInfo'
import { categories } from '@/components/Navbar/components/Categories/constants'
import { SafeListing } from '@/types/listings'
import { SafeUser } from '@/types/user'
import { Reservation } from '@prisma/client'
import { useMemo } from 'react'

type ListClientProps = {
   reservations?: Reservation[]
   listing: SafeListing & {
      user: SafeUser
   }
   currentUser?: SafeUser | null
}

export const ListingClient = ({ listing, currentUser }: ListClientProps) => {
   const category = useMemo(
      () => categories.find((item) => item.label === listing.category),
      [listing.category]
   )

   return (
      <Container>
         <div className="mx-auto max-w-screen-lg">
            <div className="flex flex-col gap-6">
               <ListingHead
                  title={listing.title}
                  imageSrc={listing.imageSrc}
                  locationValue={listing.locationValue}
                  id={listing.id}
                  currentUser={currentUser}
               />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-7  md:gap-10">
               <ListingInfo
                  user={listing.user}
                  category={category}
                  description={listing.description}
                  roomCount={listing.roomCount}
                  guestCount={listing.guestCount}
                  bathroomCount={listing.bathroomCount}
                  locationValue={listing.locationValue}
               />
            </div>
         </div>
      </Container>
   )
}
