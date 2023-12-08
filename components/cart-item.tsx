import {removeFromCart} from '@/actions/remove-from-cart'
import {Beer} from './beer-card'
import {Button} from './ui/button'

export function CartItem({beer}: {beer: Beer}) {
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
      <Button
        onClick={() => {
          removeFromCart(beer.id)
        }}
      >
        Remove
      </Button>
    </div>
  )
}
