'use server'

import {kv} from '@vercel/kv'
import {cookies} from 'next/headers'
import {Cart} from './add-to-cart'

export async function removeFromCart(itemId: number) {
  try {
    // Retrieve the current cart from KV
    const cartId = cookies().get('cartId')?.value
    if (cartId) {
      const cart: Cart | null = await kv.get(cartId)
      const newCart: Cart = {
        beers: cart?.beers.filter(b => b.id !== itemId) ?? [],
      }
      kv.set(cartId, JSON.stringify(newCart))
    } else {
      cookies().delete('cartId')
    }

    // Parse the cart JSON

    // Add the item to the cart
  } catch (error) {
    console.error('Error adding item to cart:', error)
    throw error
  }
}
