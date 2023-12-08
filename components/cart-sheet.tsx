'use client'

import {Cart} from '@/actions/add-to-cart'
import {CartItem} from '@/components/cart-item'
import {Button} from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {ShoppingBag} from 'lucide-react'
import {useEffect, useRef, useState} from 'react'
const getTotalQuantity = (cart: Cart | null) =>
  cart?.beers.reduce((acc, item) => acc + item.quantity, 0) ?? 0
export function CartSheet({cart}: {cart: Cart}) {
  const quantityRef = useRef(getTotalQuantity(cart))
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    // Open cart modal when quantity changes.
    if (getTotalQuantity(cart) > quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true)
      }
    }

    // Always update the quantity reference
    quantityRef.current = getTotalQuantity(cart)
  }, [isOpen, getTotalQuantity(cart), quantityRef])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="relative" variant="outline">
          <ShoppingBag />
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-lg p-1.5">
            {cart.beers.length}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Shopping Cart</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col">
          {cart.beers.map(beer => (
            <CartItem key={beer.id} beer={beer} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
