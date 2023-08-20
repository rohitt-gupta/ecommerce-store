import getBillboard from '@/actions/getBillboards'
import Billboard from '@/components/Billboard'
import Container from '@/components/ui/Container'
import React from 'react'

export const revalidate = 0

const HomePage = async () => {
  const billboard = await getBillboard("13bf5162-99aa-46c0-8ba0-3c08fe597201")
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}

export default HomePage