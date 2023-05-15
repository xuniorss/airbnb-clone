import { getServerSession } from 'next-auth/next'
import { authOption } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/libs/prismadb'

export const getSession = async () => {
   return await getServerSession(authOption)
}

export default async function getCurrentUser() {
   try {
      const session = await getSession()

      if (!session?.user?.email) return null

      const currentUser = await prisma.user.findUnique({
         where: { email: session.user.email as string },
      })

      if (!currentUser) return null

      return currentUser
   } catch (error) {
      return null
   }
}
