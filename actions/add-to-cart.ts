'use server'
import {Beer} from '@/app/page'
import {kv} from '@vercel/kv'
import {randomUUID} from 'crypto'
import {cookies} from 'next/headers'

interface CartBeer extends Beer {
  quantity: number
}
export interface Cart {
  beers: CartBeer[]
}

export async function addToCart(beer: Beer): Promise<void> {
  try {
    // Retrieve the current cart from KV
    const cartId = cookies().get('cartId')?.value
    if (cartId) {
      const cart: Cart | null = await kv.get(cartId)
      const newCart: Cart = cart?.beers.find(b => b.id === beer.id)
        ? {
            beers: cart.beers.map(b =>
              b.id === beer.id ? {...b, quantity: b.quantity + 1} : b
            ),
          }
        : {beers: [...cart!.beers, {...beer, quantity: 1}]}
      kv.set(cartId, JSON.stringify(newCart))
    } else {
      const newCart: Cart = {beers: [{...beer, quantity: 1}]}
      const cartId = randomUUID()
      await kv.set(cartId, JSON.stringify(newCart))
      cookies().set('cartId', cartId)
    }

    // Parse the cart JSON

    // Add the item to the cart
  } catch (error) {
    console.error('Error adding item to cart:', error)
    throw error
  }
}
