'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { MenuIcon } from 'lucide-react'
import SideMenu from './side-menu'

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5 py-8">
        <Image src="/logo.png" alt="FWS Barber" width={120} height={22} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
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
