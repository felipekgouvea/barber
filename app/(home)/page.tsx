import { ptBR } from 'date-fns/locale'
import Header from '../_components/header'
import { format } from 'date-fns'
import Search from './_components/search'
import BookingItem from '../_components/booking-item'
import BarberShopItem from './_components/barbershop-item'
import { db } from '../_lib/prisma'

export default async function Home() {
  const barbershops = await db.barbershop.findMany()

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
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
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
