import CallList from '@/components/CallList'
import React from 'react'

const RecordingsPage = () => {
  return(
    <section className="flex size-full gap-4 flex-col">
    <h1 className="text-3xl font-bold">
     Recording
    </h1>
    <CallList type="recordings"/>
    </section>
  )
}

export default RecordingsPage