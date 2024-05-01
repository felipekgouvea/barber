'use client'

import { Button } from '@/app/_components/ui/button'
import { Barbershop } from '@prisma/client'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BarberShopInfoProps {
  barbershop: Barbershop
}

const BarberShopHeader = ({ barbershop }: BarberShopInfoProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          size="icon"
          variant="outline"
          className="absolute left-4 top-4 z-50"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-4 top-4 z-50"
        >
          <MenuIcon />
        </Button>
        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{ objectFit: 'cover' }}
          className="opacity-75"
        />
      </div>

      <div className="border-secondary border-b border-solid px-5 pb-6 pt-3">
        <h1 className=" text-xl font-bold">{barbershop.name}</h1>

        <div className="item-center mt-2 flex gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm font-light">{barbershop.address}</p>
        </div>

        <div className="item-center mt-2 flex gap-1">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm font-light">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  )
}

export default BarberShopHeader
