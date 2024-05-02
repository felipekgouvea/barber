'use client'

import { Button } from '@/app/_components/ui/button'
import { Calendar } from '@/app/_components/ui/calendar'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/app/_components/ui/sheet'

import { Barbershop, Service } from '@prisma/client'
import { ptBR } from 'date-fns/locale'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { generateDayTimeList } from '../_helpers/hours'
import { format } from 'date-fns'

interface ServiceitemProps {
  service: Service
  isAuthenticated: boolean
  barberShop: Barbershop
}

const ServiceItem = ({
  service,
  barberShop,
  isAuthenticated,
}: ServiceitemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn('google')
    }
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

  console.log(timeList)

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="flex w-full flex-col ">
            <h2>{service.name}</h2>
            <p className="text-sm text-gray-400 ">{service.description}</p>

            <div className="mt-3 flex w-full items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                    Fazer Reserva
                  </SheetHeader>
                  <div className="py-6">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date}
                      onSelect={handleDateClick}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        cell: {
                          width: '100%',
                        },
                        button: {
                          width: '100%',
                        },
                        nav_button_previous: {
                          width: '32px',
                          height: '32px',
                        },
                        nav_button_next: {
                          width: '32px',
                          height: '32px',
                        },
                        caption: {
                          textTransform: 'capitalize',
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex gap-3 overflow-x-auto border-y border-solid border-secondary px-5 py-6 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? 'default' : 'outline'}
                          className="rounded-full"
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="px-5 py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Data</h3>
                            <h4 className="text-sm">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <h4 className="text-sm">{barberShop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button disabled={!hour || !date}>Confirmar reserva</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem