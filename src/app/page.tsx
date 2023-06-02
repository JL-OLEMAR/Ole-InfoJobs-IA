import { ListOfOffers } from './components/ListOfOffers'
import { getInfojobsOffers } from './services/getOffers'

export default async function Home() {
  const listOfOffers = await getInfojobsOffers()

  return (
    <>
      <main className='max-w-7xl mx-auto px-4 pb-24'>
        <ListOfOffers offers={listOfOffers} />
      </main>
    </>
  )
}
