'use client'
import {addToCart} from '@/actions/add-to-cart'
import {useAction} from 'next-safe-action/hook'
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
}
export function BeerCard({beer}: {beer: Beer}) {
  const router = useRouter()
  const {status, execute} = useAction(addToCart, {
    onSuccess: () => {
      router.refresh()
    },
  })
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={status === 'executing'}
        onClick={() => {
          execute({beer: {...beer, quantity: 1}})
          router.refresh()
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}
