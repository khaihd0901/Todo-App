import React, { useState } from 'react'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({handleTaskChanged}) => {
  const [newTask, setNewTask] = useState('');
  const addNewTask = async () =>{
    if(newTask.trim()){
      try {
        await api.post("/tasks", {title: newTask});
        toast.success(`Task "${newTask}" added success`);
        handleTaskChanged();
      } catch (error) {
        console.log("Error when add a task:", error);
        toast.error("Error when add a task")
      }
      setNewTask("")
    }else{
      toast.error("You need input task")
    }
  }
  const handleKeyPress = (e) =>{
    if (e.key === "Enter") {
      addNewTask()
    }
  }
  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeHolder="What next?"
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            value={newTask}
            onChange ={(even)=>setNewTask(even.target.value)}
            onKeyPress = {handleKeyPress}
          />
          <Button className="px-6 cursor-pointer" variant="gradient" size="xl" onClick = {addNewTask} disabled = {!newTask.trim()}>
            <Plus />
            Add Task
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AddTask