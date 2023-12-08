'use server'
import {Beer} from '@/app/page'
import {kv} from '@vercel/kv'
import {createSafeActionClient} from 'next-safe-action'
import {cookies} from 'next/headers'
import {z} from 'zod'

const safeAction = createSafeActionClient()

const input = z.object({
  beer: z.object({
    id: z.number(),
    name: z.string(),
    style: z.string(),
    hop: z.string(),
    malts: z.string(),
    ibu: z.string(),
    alcohol: z.string(),
    blg: z.string(),
    quantity: z.number(),
  }),
})
interface CartBeer extends Beer {
  quantity: number
}
export interface Cart {
  beers: CartBeer[]
}

export const addToCart = safeAction(input, async ({beer}) => {
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
      : {beers: [...(cart?.beers ?? []), {...beer, quantity: 1}]}
    kv.set(cartId, JSON.stringify(newCart))
  } else {
    const newCart: Cart = {beers: [{...beer, quantity: 1}]}
    const cartId = Math.random().toString(36).substring(2, 15)
    await kv.set(cartId, JSON.stringify(newCart))
    cookies().set('cartId', cartId)
  }

  // Parse the cart JSON

  // Add the item to the cart
  return {success: true}
})
