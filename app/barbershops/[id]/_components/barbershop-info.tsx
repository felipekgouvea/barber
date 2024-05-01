import { Button } from '@/app/_components/ui/button'
import { Smartphone } from 'lucide-react'

const BarberShopInfo = () => {
  return (
    <div>
      <div>
        <h2>Sobre Nós</h2>
        <p>
          Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
          equipe de mestres barbeiros transforma cortes de cabelo e barbas em
          obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo
          e uma comunidade unida.
        </p>
      </div>
      <div>
        <Smartphone />
        <p>(27) 9.9999-9999</p>
        <Button>Copiar</Button>
      </div>
      <div>
        <div>
          <p>Segunda-Feira</p>
          <p>Fechado</p>
        </div>
        <div>
          <p>Terça-Feira</p>
          <p>09:00 - 21:00</p>
        </div>
      </div>
    </div>
  )
}

export default BarberShopInfo
