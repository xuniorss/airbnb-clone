import { User } from '@prisma/client'
import { Container } from '../Container'
import { Logo } from './components/Logo'
import { Search } from './components/Search'
import { UserMenu } from './components/UserMenu'

type NavbarProps = {
   currentUser?: User | null
}

export const Navbar = ({ currentUser }: NavbarProps) => {
   return (
      <div className="fixed w-full bg-white z-10 shadow-sm">
         <div className="py-4 border-b-[1px]">
            <Container>
               <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                  <Logo />
                  <Search />
                  <UserMenu currentUser={currentUser} />
               </div>
            </Container>
         </div>
      </div>
   )
}
