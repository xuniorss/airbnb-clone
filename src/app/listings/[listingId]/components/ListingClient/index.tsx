'use client'

import { Container } from '@/components/Container'
import { ListingHead } from '@/components/Listings/ListingHead'
import { ListingInfo } from '@/components/Listings/ListingInfo'
import { ListingReservation } from '@/components/Listings/ListingReservation'
import { categories } from '@/components/Navbar/components/Categories/constants'
import useLoginModal from '@/hooks/useLoginModal'
import { SafeListing } from '@/types/listings'
import { SafeReservation } from '@/types/reservations'
import { SafeUser } from '@/types/user'
import { Reservation } from '@prisma/client'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'

const initialDateRange = {
   startDate: new Date(),
   endDate: new Date(),
   key: 'selection',
}

type ListClientProps = {
   reservations?: SafeReservation[]
   listing: SafeListing & {
      user: SafeUser
   }
   currentUser?: SafeUser | null
}

export const ListingClient = ({
   reservations = [],
   listing,
   currentUser,
}: ListClientProps) => {
   const [isLoading, setIsloading] = useState(false)
   const [totalPrice, setTotalPrice] = useState(listing.price)
   const [dateRange, setDateRange] = useState<Range>(initialDateRange)

   const loginModal = useLoginModal()
   const router = useRouter()

   const disabledDates = useMemo(() => {
      let dates: Date[] = []

      reservations.forEach((reservation) => {
         const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate),
         })

         dates = [...dates, ...range]
      })

      return dates
   }, [reservations])

   const category = useMemo(
      () => categories.find((item) => item.label === listing.category),
      [listing.category]
   )

   const onCreateReservation = useCallback(() => {
      if (!currentUser) return loginModal.onOpen()

      setIsloading(true)

      axios
         .post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
         })
         .then(() => {
            toast.success('Listagem reservada!')
            setDateRange(initialDateRange)
            router.push('/trips')
         })
         .catch(() => toast.error('Algo deu errado.'))
         .finally(() => setIsloading(false))
   }, [
      currentUser,
      dateRange.endDate,
      dateRange.startDate,
      listing?.id,
      loginModal,
      router,
      totalPrice,
   ])

   useEffect(() => {
      if (dateRange.startDate && dateRange.endDate) {
         const dayCount = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
         )

         if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price)
         } else {
            setTotalPrice(listing.price)
         }
      }
   }, [dateRange.endDate, dateRange.startDate, listing.price])

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

               <div className="order-first mb-10 md:order-last md:col-span-3">
                  <ListingReservation
                     price={listing.price}
                     totalPrice={totalPrice}
                     onChangeDate={(value) => setDateRange(value)}
                     dateRange={dateRange}
                     onSubmit={onCreateReservation}
                     disabled={isLoading}
                     disabledDates={disabledDates}
                  />
               </div>
            </div>
         </div>
      </Container>
   )
}
