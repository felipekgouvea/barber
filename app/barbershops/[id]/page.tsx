import { getServerSession } from 'next-auth'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs'
import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'

import BarberShopHeader from './_components/barbershop-header'
import BarberShopInfo from './_components/barbershop-info'
import ServiceItem from './_components/service-item'

interface BarberShopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarberShopDetailsPage = async ({
  params,
}: BarberShopDetailsPageProps) => {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return null
  }

  return (
    <div>
      <BarberShopHeader barbershop={barbershop} />

      <div className="px-5 py-6">
        <Tabs defaultValue="services">
          <TabsList className="mb-10 grid w-[250px] grid-cols-2 bg-transparent px-0">
            <TabsTrigger
              className="w-24 rounded-xl border border-solid border-[#26272B] px-12 py-4 text-white data-[state=active]:bg-purple-900"
              value="services"
            >
              Serviços
            </TabsTrigger>
            <TabsTrigger
              value="infos"
              className="w-[135px] rounded-xl border border-solid border-[#26272B] px-16 py-4 text-white data-[state=active]:bg-purple-900"
            >
              Informações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            <div className="mt-6 flex flex-col gap-4">
              {barbershop.services.map((service) => (
                <ServiceItem
                  service={service}
                  barberShop={barbershop}
                  key={service.id}
                  isAuthenticated={!!session?.user}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="infos">
            <BarberShopInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default BarberShopDetailsPage
