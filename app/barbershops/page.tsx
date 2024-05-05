import BarberShopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarberShopPageProps{
  searchParams: {
    search?: string
  }
}

const BarbershopPage = async ({searchParams}:BarberShopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })   
  
  return ( 
    <>
      <Header/>


      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{
         search: searchParams.search as any
        }}/>

        <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para {searchParams.search}</h1>

        {barbershops.length > 0 ? (
          <div className="grid grid-cols-2 mt-4 gap-4">
            {barbershops.map(barbershop => (
              <div key={barbershop.id} className="w-full">
                <BarberShopItem barbershop={barbershop} />
              </div>
            ))}
        </div>) : (
          <div className="text-gray-400 font-bold text-lg uppercase flex text-center justify-center mt-20">
            <h1>Nenhum resultado encontrado para essa busca!</h1>
          </div>
        )}
      </div>
    </>
);
}
 
export default BarbershopPage;