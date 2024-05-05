import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'

import BookingItem from '../_components/booking-item'
import Header from '../_components/header'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import BarberShopItem from './_components/barbershop-item'
import Search from './_components/search'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBooking] = await Promise.all([
    db.barbershop.findMany(),

    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          orderBy: [
            {
              date: 'asc',
            },
          ],
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá ${session?.user?.name?.split(' ')[0]}!`
            : 'Olá! Vamos agendar um corte hoje?'}
        </h2>
        <p className="text-sm font-extralight capitalize">
          {format(new Date(), "EEEE', ' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBooking.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className='win-w-[167px] max-w-[167px]'>
                <BarberShopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className='win-w-[167px] max-w-[167px]'>
              <BarberShopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
