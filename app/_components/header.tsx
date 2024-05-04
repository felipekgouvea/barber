'use client'

import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import SideMenu from './side-menu'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5 py-8">
        <Link href="/">
          <Image src="/logo.png" alt="FWS Barber" width={120} height={22} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
