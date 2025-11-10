import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className="space-y-3">
        <Circle className='mx-auto size-12 text-muted-foreground'/>
        <div>
          <h3 className="font-medium text-foreground">
            {
              filter === "active" ? "No Activating Task" :
              filter === "completed" ? "No Completed Task" :
              "No Data"
            }
          </h3>
          <p className="text-sm text-muted-foreground">
            {
              filter === "all" ? "Create a task to change your self":
              `Switch to "All" to see all Task ${
                filter === "active" ? "Completed" : "Doing..."
              }`
            }
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TaskEmptyState