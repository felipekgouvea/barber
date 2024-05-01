import { ptBR } from 'date-fns/locale'
import Header from '../_components/header'
import { format } from 'date-fns'

const Home = () => {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE', ' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  )
}

export default Home
