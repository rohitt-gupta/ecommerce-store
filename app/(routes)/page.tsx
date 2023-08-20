import getBillboard from '@/actions/getBillboards'
import getProducts from '@/actions/getProducts'
import Billboard from '@/components/Billboard'
import ProductList from '@/components/ProductList'
import Container from '@/components/ui/Container'
import React from 'react'

export const revalidate = 0

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true })
  const billboard = await getBillboard("13bf5162-99aa-46c0-8ba0-3c08fe597201")
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage