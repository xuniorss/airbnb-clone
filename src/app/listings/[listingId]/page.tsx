import getCurrentUser from '@/actions/getCurrentUser'
import { getListingById } from '@/actions/getListingById'
import getReservations from '@/actions/getReservations'
import { EmptyState } from '@/components/EmptyState'

import { ListingClient } from './components/ListingClient'

type Params = {
   listingId?: string
}

export default async function ListingPage({ params }: { params: Params }) {
   const listing = await getListingById(params)
   const reservations = await getReservations(params)
   const currentUser = await getCurrentUser()

   if (!listing) return <EmptyState />

   return (
      <ListingClient
         listing={listing}
         reservations={reservations}
         currentUser={currentUser}
      />
   )
}
