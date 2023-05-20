'use client'

import { ptBR } from 'date-fns/locale'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

type CalendarProps = {
   value: Range
   onChange: (value: RangeKeyDict) => void
   disabledDates?: Date[]
}

export const Calendar = ({ value, onChange, disabledDates }: CalendarProps) => {
   return (
      <DateRange
         locale={ptBR}
         rangeColors={['#262626']}
         ranges={[value]}
         date={new Date()}
         onChange={onChange}
         direction="vertical"
         showDateDisplay={false}
         minDate={new Date()}
         disabledDates={disabledDates}
      />
   )
}
