import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import { EmptyState } from '@/components/EmptyState'

import { TripsClient } from './components/TripsClient'

export default async function TripsPage() {
   const currentUser = await getCurrentUser()

   if (!currentUser)
      return (
         <EmptyState title="Não autorizado" subtitle="Por favor, faça login" />
      )

   const reservations = await getReservations({ userId: currentUser.id })

   if (reservations.length === 0)
      return (
         <EmptyState
            title="Nenhuma viagem encontrada"
            subtitle="Parece que você não reservou nenhuma viagem"
         />
      )

   return <TripsClient reservations={reservations} currentUser={currentUser} />
}
