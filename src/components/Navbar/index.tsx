import { SafeUser } from '@/types/user'

import { Container } from '../Container'
import { Categories } from './components/Categories'
import { Logo } from './components/Logo'
import { Search } from './components/Search'
import { UserMenu } from './components/UserMenu'

type NavbarProps = {
   currentUser?: SafeUser | null
}

export const Navbar = ({ currentUser }: NavbarProps) => {
   return (
      <div className="fixed z-10 w-full bg-white shadow-sm">
         <div className="border-b-[1px] py-4">
            <Container>
               <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                  <Logo />
                  <Search />
                  <UserMenu currentUser={currentUser} />
               </div>
            </Container>
         </div>
         <Categories />
      </div>
   )
}
