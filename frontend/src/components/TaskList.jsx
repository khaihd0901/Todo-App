import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = () => {
  let filter = 'all';
  const filteredTask = [
    {
      _id: "1",
      title: "hoc react",
      description:"abc",
      status:"active",
      createdAt:new Date()
    },
    {
      _id: "2",
      title: "hoc js",
      description:"abc",
      status:"completed",
      completeAt:new Date(),
      createdAt:new Date()
    }
  ];
  if (!filteredTask || filteredTask.length === 0){
    return <TaskEmptyState filter = {filter}/>
  }
  return (
    <div className="space-y-3">
      {filteredTask.map((task, index) => (
        <TaskCard 
          key={task._id ?? index}
          task={task}
          index={index}
        />
      ))}
    </div>
  )
}

export default TaskList