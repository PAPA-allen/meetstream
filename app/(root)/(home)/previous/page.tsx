import CallList from '@/components/CallList'
import React from 'react'

const PreviousPage= () => {
  return (
    <section className="flex size-full gap-4 flex-col">
    <h1 className="text-3xl font-bold">
     Previous
    </h1>
    <CallList type="ended"/>
    </section>
  )
}

export default PreviousPage
