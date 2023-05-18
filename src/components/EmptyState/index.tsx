'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../Button'
import { Heading } from '../Modals/components/Heading'

type EmptyStateProps = {
   title?: string
   subtitle?: string
   showReset?: boolean
}

export const EmptyState = ({
   title = 'Nenhuma correspondência exata',
   subtitle = 'Tente alterar ou remover alguns de seus filtros',
   showReset,
}: EmptyStateProps) => {
   const router = useRouter()

   return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
         <Heading center title={title} subtitle={subtitle} />
         <div className="mt-4 w-48">
            {showReset && (
               <Button
                  outline
                  label="Remover todos os filtros"
                  onClick={() => router.push('/')}
               />
            )}
         </div>
      </div>
   )
}
