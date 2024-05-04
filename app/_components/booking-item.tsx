import { Prisma } from '@prisma/client'
import { format, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isPast(booking.date)

  return (
    <Card className="min-w-full">
      <CardContent className="flex px-0 py-0">
        <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
          <Badge
            variant={isBookingConfirmed ? 'secondary' : 'default'}
            className="w-fit"
          >
            {isBookingConfirmed ? 'Finalizado' : 'Confirmado'}
          </Badge>
          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={booking.barbershop.imageUrl}
                alt="Imagem do serviço"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm font-extralight">
              {booking.barbershop.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, 'dd')}</p>
          <p className="text-sm">{format(booking.date, 'hh:mm')}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
