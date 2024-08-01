import CallList from '@/components/CallList'
import React from 'react'

const UpcomingPage = () => {
  return (
    <section className="flex size-full gap-4 flex-col">
    <h1 className="text-3xl font-bold">
      Upcoming
    </h1>
    <CallList type="upcoming"/>
    </section>
  )
}

export default UpcomingPage
