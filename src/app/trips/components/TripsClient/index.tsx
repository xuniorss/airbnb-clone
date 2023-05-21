'use client'

import { Container } from '@/components/Container'
import { ListingCard } from '@/components/Listings/ListingCard'
import { Heading } from '@/components/Modals/components/Heading'
import { SafeReservation } from '@/types/reservations'
import { SafeUser } from '@/types/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

type TripsClientsProps = {
   reservations: SafeReservation[]
   currentUser?: SafeUser | null
}

export const TripsClient = ({
   reservations,
   currentUser,
}: TripsClientsProps) => {
   const router = useRouter()
   const [deletingId, setDeletingId] = useState('')

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id)

         axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
               toast.success('Reserva cancelada.')
               router.refresh()
            })
            .catch((error) => toast.error(error?.response?.data?.error))
            .finally(() => setDeletingId(''))
      },
      [router]
   )

   return (
      <Container>
         <Heading
            title="Viagens"
            subtitle="Onde você esteve e para onde está indo"
         />
         <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {reservations.map((reservation) => (
               <ListingCard
                  key={reservation.id}
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel="Cancelar reserva"
                  currentUser={currentUser}
               />
            ))}
         </div>
      </Container>
   )
}
