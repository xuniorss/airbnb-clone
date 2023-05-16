import getCurrentUser from '@/actions/getCurrentUser'
import { LoginModal } from '@/components/Modals/LoginModal'
import { RegisterModal } from '@/components/Modals/RegisterModal'
import { RentModal } from '@/components/Modals/RentModal'
import { Navbar } from '@/components/Navbar'
import ToastProvider from '@/providers/ToastProvider'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
   title: 'Airbnb',
   description: 'Airbnb clone',
}

export default async function RootLayout({
   children,
}: {
   children: ReactNode
}) {
   const currentUser = await getCurrentUser()

   return (
      <html lang="pt-br">
         <body className={nunito.className}>
            <ToastProvider />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
            {children}
         </body>
      </html>
   )
}
