import { db } from '@/app/_lib/prisma'
import ServiceItem from './_components/service-item'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs'
import BarberShopHeader from './_components/barbershop-header'
import BarberShopInfo from './_components/barbershop-info'

interface BarberShopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarberShopDetailsPage = async ({
  params,
}: BarberShopDetailsPageProps) => {
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
        <Tabs defaultValue="services" className="">
          <TabsList className="mb-10 grid w-[250px] grid-cols-2 bg-transparent">
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
                <ServiceItem service={service} key={service.id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="infos" className="h-screen">
            <BarberShopInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default BarberShopDetailsPage
