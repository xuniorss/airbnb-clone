'use client'

import { CategoryBox } from '@/components/CategoryBox'
import { Container } from '@/components/Container'
import { usePathname, useSearchParams } from 'next/navigation'
import { categories } from './constants'

export const Categories = () => {
   const params = useSearchParams()
   const category = params?.get('category')
   const pathname = usePathname()

   const isMainPage = pathname === '/'

   if (!isMainPage) return null

   return (
      <Container>
         <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
            {categories.map((item) => (
               <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
               />
            ))}
         </div>
      </Container>
   )
}
