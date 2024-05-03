import { isFuture, isPast } from 'date-fns'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import BookingItem from '../_components/booking-item'
import Header from '../_components/header'
import { db } from '../_lib/prisma'
import { authOptions } from '../api/auth/[...nextauth]/route'

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  })

  const confirmedBooking = bookings.filter((bookings) =>
    isFuture(bookings.date),
  )

  const finishedBooking = bookings.filter((bookings) => isPast(bookings.date))

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
          Confirmados
        </h2>

        <div className="flex flex-col gap-3">
          {confirmedBooking.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
          Finalizados
        </h2>

        <div className="flex flex-col gap-3">
          {finishedBooking.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
