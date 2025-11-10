import React from 'react'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const AddTask = () => {
  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeHolder="What next?"
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
          <Button className="px-6 cursor-pointer" variant="gradient" size="xl">
            <Plus />
            Add Task
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AddTask