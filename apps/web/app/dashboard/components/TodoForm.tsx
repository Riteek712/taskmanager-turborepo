"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calender"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Todo, TodoStatus } from '../types'

interface TodoFormProps {
  todo?: Todo | Omit<Todo, 'id'>;
  onSubmit: (todo: Omit<Todo, 'id'> | Todo) => Promise<void>;
  toUpdate: boolean;
}

export default function TodoForm({ todo, onSubmit, toUpdate }: TodoFormProps) {
    const [date, setDate] = useState<Date | undefined>(
        todo?.deadline ? new Date(todo.deadline) : undefined
      );
      
  const [loading, setLoading] = useState(false)
  
  // Ref for the calendar button to set focus manually
  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the calendar button when the component is mounted
    calendarButtonRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const todoData: Omit<Todo, 'id'> = {
      task: formData.get('task') as string,
      description: formData.get('description') as string,
      status: (todo?.status || 'ACTIVE') as TodoStatus,
      deadline: date?.toISOString(),
    }

    try {
      if (toUpdate && todo && 'id' in todo) {
        // Update existing todo (with id)
        await onSubmit({ ...todoData, id: todo.id });
      } else {
        // Create new todo (no id)
        await onSubmit(todoData);
      }
      
      if (!toUpdate) {
        // Only reset form if it's a new todo
        e.currentTarget.reset()
        setDate(undefined)
      }
    } catch (error) {
      console.error('Error submitting todo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          name="task"
          placeholder="Enter task title"
          required
          defaultValue={todo?.task}
          className="text-lg font-medium"
        />
        <Textarea
          name="description"
          placeholder="Enter task description"
          defaultValue={todo?.description}
          className="resize-none"
        />
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[240px] justify-start text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
                ref={calendarButtonRef}  // Attach ref for focusing
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a deadline</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : toUpdate ? "Update Todo" : "Add Todo"}
          </Button>
        </div>
      </div>
    </form>
  )
}
