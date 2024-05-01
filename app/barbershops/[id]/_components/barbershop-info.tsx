import { Button } from '@/app/_components/ui/button'
import { Smartphone } from 'lucide-react'

const BarberShopInfo = () => {
  return (
    <div>
      <div className="border-secondary border-b border-solid ">
        <h2 className="text-xs uppercase text-gray-300">Sobre Nós</h2>
        <p className="mb-12 mt-4 text-justify text-sm leading-6 text-white">
          Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
          equipe de mestres barbeiros transforma cortes de cabelo e barbas em
          obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo
          e uma comunidade unida.
        </p>
      </div>

      <div className="border-secondary flex flex-col gap-4 border-b border-solid py-8 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone size={24} />
            <p>(27) 9.9999-9999</p>
          </div>
          <Button
            className="px-6 py-4 text-sm font-bold text-white"
            variant="secondary"
          >
            Copiar
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone size={24} />
            <p>(27) 9.9999-9999</p>
          </div>
          <Button
            className="px-6 py-4 text-sm font-bold text-white"
            variant="secondary"
          >
            Copiar
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone size={24} />
            <p>(27) 9.9999-9999</p>
          </div>
          <Button
            className="px-6 py-4 text-sm font-bold text-white"
            variant="secondary"
          >
            Copiar
          </Button>
        </div>
      </div>

      <div className="pt-6">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Segunda-Feira</p>
          <p>Fechado</p>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Terça-Feira</p>
          <p>09:00 - 21:00</p>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Quarta-Feira</p>
          <p>09:00 - 21:00</p>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Quinta-Feira</p>
          <p>09:00 - 21:00</p>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Sexta-Feira</p>
          <p>09:00 - 21:00</p>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Sábado</p>
          <p>08:00 - 17:00</p>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <p className="text-base font-normal text-gray-300">Domingo</p>
          <p>Fechado</p>
        </div>
      </div>
    </div>
  )
}

export default BarberShopInfo
