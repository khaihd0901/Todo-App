import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "")

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("task deleted");
      handleTaskChanged();
    } catch (error) {
      console.log("Error when delete a task:", error);
      toast.error("Error when delete a task")
    }
  }
  const updateTask = async () => {
    try {
      setIsEditing(false)
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle
      });
      toast.success(`task changed to ${updateTaskTitle}`)
      handleTaskChanged();

    } catch (error) {
      console.log("Error when update a task:", error);
      toast.error("Error when update a task")
    }
  }
  const toggleTaskComplete = async () => {
    try {
      if (task.status === "active") {
       await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completeAt: new Date().toISOString(),
        });
        toast.success(`${task.title} complete`)
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completeAt: null
        });
        toast.success(`${task.title} change to active`)
      }
      handleTaskChanged();
    } catch (error) {
      console.log("Error when update a task:", error);
      toast.error("Error when update a task")
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask()
    }
  }

  return (
    <Card className={cn(
      "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in",
      task.status === 'complete' && 'opacity-75'
    )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4 group">
        {/* nut tron */}
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            "flex-shrink-0 size-8 rounded-null transition-all duration-200",
            task.status === "complete" ?
              "text-success hover:text-success/80" :
              "text-muted-foreground hover:text-primary"
          )}
          onClick={() => toggleTaskComplete()}
        >
          {
            task.status === "complete" ? (
              <CheckCircle2 className='size-5' />
            ) : (
              <Circle className='size-5' />
            )
          }
        </Button>
        {/* hien thi hoac chinh sua tieu de */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeHolder="What next?"
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false)
                setUpdateTaskTitle(task.title || '')
              }}
            />
          ) : (
            <>
              <h1
                className={cn(
                  "text-base font-bold transition-all duration-200",
                  task.status === "complete" ?
                    "line-through text-muted-foreground" :
                    "text-foreground"
                )}
              >
                {task.title}
              </h1>
              <p className={cn(
                "text-base transition-all duration-200",
                task.status === "complete" ?
                  "line-through text-muted-foreground" :
                  "text-foreground"
              )}>
                {task.description}
              </p>
            </>
          )}
          {/* ngay tao va ngay hoan thanh */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className='size-3 text-muted-foreground' />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {
              task.completeAt && (
                <>
                  <span className="text-xs text-muted-foreground">-</span>
                  <Calendar className='size-3 text-muted-foreground' />
                  <span className="text-xs text-muted-ground">
                    {new Date(task.completeAt).toLocaleString()}
                  </span>

                </>
              )
            }
          </div>
        </div>
        {/* nut chinh va xoa */}
        <div className="hidden group-hover:inline-flex gap-2 animate-slide-up">
          <Button
            variant="ghost"
            size='icon'
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info cursor-pointer'
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || '')
            }}
          >
            <SquarePen className='size-4' />
          </Button>

          <Button
            variant="ghost"
            size='icon'
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive cursor-pointer'
            onClick={() => handleDeleteTask(task._id)}
          >
            <Trash2 className='size-4' />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard