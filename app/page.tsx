import {BeerCard} from '@/components/beer-card'

export interface Beer {
  id: string
  name: string
  style: string
  hop: string
  malts: string
  ibu: string
  alcohol: string
  blg: string
  description: string
  image: string
}
export default async function Home() {
  const response = await fetch(
    'https://random-data-api.com/api/v2/beers?size=100'
  )
  const beers: Beer[] = await response.json()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Welcome to the Beer Store!</h1>
      <div className="flex flex-wrap justify-center">
        {beers.map(beer => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </main>
  )
}
