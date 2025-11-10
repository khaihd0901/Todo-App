import AddTask from '@/components/AddTask'
import Header from '@/components/Header'
import Filter from '@/components/FIlter'
import React from 'react'
import TaskList from '@/components/TaskList'
import Pagination from '@/components/Pagination'
import DateTimeFilter from '@/components/DateTimeFilter'

const Homepage = () => {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
        }}
      />
      <div className='container pt-8 mx-auto relative z-10'>
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          <AddTask />

          <Filter />

          <TaskList />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Pagination />

            <DateTimeFilter />
          </div>

        </div>
      </div>

    </div>
  )
}

export default Homepage