import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import BookingItem from '../_components/booking-item'
import Header from '../_components/header'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ])

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
              Finalizados
            </h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default BookingsPage
