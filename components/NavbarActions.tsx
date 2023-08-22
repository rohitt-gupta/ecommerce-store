'use client'

import { ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Button from './ui/Button'
import useCart from '@/hooks/useCart'
import { useRouter } from 'next/navigation'

const NavbarActions = () => {
  //  No HYDRATION ERROR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cart = useCart()
  const router = useRouter()
  if (!isMounted) return null



  return (
    <div className='ml-auto flex items-center gap-x-4'>
      <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>{cart.items.length}</span>
      </Button>
    </div>
  )
}

export default NavbarActions