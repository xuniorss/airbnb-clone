import { Navbar } from '@/components/Navbar'
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
            <Navbar />
            {children}
         </body>
      </html>
   )
}
