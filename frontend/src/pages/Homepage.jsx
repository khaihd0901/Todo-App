import AddTask from '@/components/AddTask'
import Header from '@/components/Header'
import StateAndFIlter from '@/components/StateAndFIlter'
import React, { useEffect, useState } from 'react'
import TaskList from '@/components/TaskList'
import Pagination from '@/components/Pagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import { toast } from 'sonner'
import api from '@/lib/axios'

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('today')


  useEffect(() => {
    fetchTasks();
  }, [dateQuery])
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompleteCount(res.data.completeCount);
    } catch (error) {
      console.error("error when call task api: ", error)
      toast.error("Error when finding tasks")
    }
  }
  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete'
      default:
        return true;
    }
  })
  const handleTaskChanged = () => {
    fetchTasks();
  }
  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
        }}
      />
      <div className='container pt-8 mx-auto relative z-10'>
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          <AddTask handleTaskChanged={handleTaskChanged} />

          <StateAndFIlter
            filter={filter}
            setFilter={setFilter}
            activeCount={activeCount}
            completeCount={completeCount}
            dateQuery={dateQuery}
            setDateQuery={setDateQuery}
          />

          <TaskList filteredTask={filteredTask} filter={filter} handleTaskChanged={handleTaskChanged} />

        </div>
      </div>
    </div>

  )
}

export default Homepage