import { RegisterModal } from '@/components/Modals/RegisterModal'
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

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt-br">
         <body className={nunito.className}>
            <ToastProvider />
            <RegisterModal />
            <Navbar />
            {children}
         </body>
      </html>
   )
}
