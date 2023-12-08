import {addToCart} from '@/actions/add-to-cart'
import {useRouter} from 'next/navigation'

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
export function BeerCard({beer}: {beer: Beer}) {
  const router = useRouter()
  return (
    <div
      key={beer.id}
      className="flex flex-col items-center justify-center w-1/4 p-4"
    >
      <h2 className="text-lg font-bold">{beer.name}</h2>
      <p className="text-sm">{beer.style}</p>
      <p className="text-sm">{beer.hop}</p>
      <p className="text-sm">{beer.malts}</p>
      <p className="text-sm">{beer.ibu}</p>
      <p className="text-sm">{beer.alcohol}</p>
      <p className="text-sm">{beer.blg}</p>
      <p className="text-sm">{beer.description}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          addToCart(beer)
          router.refresh()
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}
