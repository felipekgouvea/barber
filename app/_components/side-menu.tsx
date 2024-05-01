'use client'

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const SideMenu = () => {
  const { data } = useSession()

  const hadleLogoutClick = () => signOut()
  const hadleLoginClick = () => signIn('google')

  return (
    <>
      {data?.user ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.image ?? ''} />
            </Avatar>

            <h2 className="text-sm font-bold">{data.user.name}</h2>
          </div>

          <Button variant="secondary" size="icon">
            <LogOutIcon size={18} onClick={hadleLogoutClick} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-2 ">
            <UserIcon size={32} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button
            onClick={hadleLoginClick}
            variant="secondary"
            className="w-full justify-start"
          >
            <LogInIcon className="mr-2" size={16} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start">
            <CalendarIcon size={18} className="mr-2" />
            Agendamentos
          </Button>
        )}
      </div>
    </>
  )
}

export default SideMenu
