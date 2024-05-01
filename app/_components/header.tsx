import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5 py-8">
        <Image src="/logo.png" alt="FWS Barber" width={120} height={22} />
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
