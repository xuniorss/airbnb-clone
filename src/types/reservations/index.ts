import { Reservation } from '@prisma/client'
import { SafeListing } from '../listings'

export type SafeReservation = Omit<
   Reservation,
   'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
   createdAt: string
   startDate: string
   endDate: string
   listing: SafeListing
}
