import React from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';

const TaskCard = ({task,index}) => {
  let isEditing = false;
  console.log(task)
  return (
    <Card className={cn(
      "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in",
      task.status === 'completed' && 'opacity-75'
    )}
    style={{animationDelay: `${index*50}ms`}}
    >
      <div className="flex items-center gap-4 group">
        {/* nut tron */}
        <Button
        variant='ghost'
        size='icon'
        className={cn(
          "flex-shrink-0 size-8 rounded-null transition-all duration-200",
          task.status === "completed" ?
          "text-success hover:text-success/80" :
          "text-muted-foreground hover:text-primary"
        )}
        >
          {
            task.status === "completed" ? (
              <CheckCircle2 className='size-5'/>
            ) : (
              <Circle className='size-5'/>
            )
          }
        </Button>
        {/* hien thi hoac chinh sua tieu de */}
        <div className="flex-1 min-w-0">
          {isEditing ? true (
              <Input
                placeHolder = "What next?"
                className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                type="text"
              />
          ) : (
            <>
            <h1
              className={cn(
                "text-base font-bold transition-all duration-200",
                task.status === "completed" ?
                "line-through text-muted-foreground" :
                "text-foreground"
              )}
            >
              {task.title}
            </h1>
            <p className={cn(
                "text-base transition-all duration-200",
                task.status === "completed" ?
                "line-through text-muted-foreground" :
                "text-foreground"
              )}>
              {task.description}
            </p>
            </>
          )}     
        {/* ngay tao va ngay hoan thanh */}
        <div className="flex items-center gap-2 mt-1">
            <Calendar className='size-3 text-muted-foreground'/>
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {
              task.completeAt && (
                <>
                  <span className="text-xs text-muted-foreground">-</span>
                  <Calendar className='size-3 text-muted-foreground'/>
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
              className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
            >
              <SquarePen className='size-4'/>
            </Button>

            <Button
              variant="ghost"
              size='icon'
              className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
            >
              <Trash2 className='size-4'/>
            </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard