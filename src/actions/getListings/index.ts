import prisma from '@/libs/prismadb'

export default async function getListings() {
   try {
      const listings = await prisma.listing.findMany({
         orderBy: { createdAt: 'desc' },
      })

      return listings
   } catch (error: any) {
      console.error(error)
      throw new Error(error)
   }
}
