import { SafeUser } from '@/types/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import useLoginModal from '../useLoginModal'

type FavoriteProps = {
   listingId: string
   currentUser?: SafeUser | null
}

export const useFavorite = ({ listingId, currentUser }: FavoriteProps) => {
   const router = useRouter()
   const loginModal = useLoginModal()

   const hasFavorited = useMemo(() => {
      const list = currentUser?.favoriteIds || []
      return list.includes(listingId)
   }, [currentUser?.favoriteIds, listingId])

   const toggleFavorite = useCallback(
      async (e: MouseEvent<HTMLDivElement>) => {
         e.stopPropagation()

         if (!currentUser) return loginModal.onOpen()

         try {
            let request

            if (hasFavorited)
               request = () => axios.delete(`/api/favorites/${listingId}`)
            else request = () => axios.post(`/api/favorites/${listingId}`)

            await request()
            router.refresh()
            toast.success('Sucesso')
         } catch (error) {
            process.env.NODE_ENV === 'development' && console.error(error)
            toast.error('Algo deu errado.')
         }
      },
      [currentUser, hasFavorited, listingId, loginModal, router]
   )

   return { hasFavorited, toggleFavorite }
}
