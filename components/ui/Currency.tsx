'use client'
import React, { useState, useEffect } from 'react'

export const formatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD',
})

interface CurrencyProps {
  value?: string | number
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className='font-bold'>
      {formatter.format(Number(value))}
    </div>
  )
}

export default Currency