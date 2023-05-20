'use client'

import { Button } from '@/components/Button'
import { Calendar } from '@/components/Inputs/Calendar'
import { Range } from 'react-date-range'

type ListingReservationProps = {
   price: number
   dateRange: Range
   totalPrice: number
   onChangeDate: (value: Range) => void
   onSubmit: () => void
   disabled?: boolean
   disabledDates: Date[]
}

export const ListingReservation = ({
   price,
   dateRange,
   totalPrice,
   onChangeDate,
   onSubmit,
   disabled,
   disabledDates,
}: ListingReservationProps) => {
   return (
      <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
         <div className="flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">$ {price}</div>
            <div className="font-light text-neutral-600">noite</div>
         </div>
         <hr />
         <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
         />
         <hr />
         <div className="p-4">
            <Button disabled={disabled} label="Reservar" onClick={onSubmit} />
         </div>
         <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
            <div>Total</div>
            <div>$ {totalPrice}</div>
         </div>
      </div>
   )
}
