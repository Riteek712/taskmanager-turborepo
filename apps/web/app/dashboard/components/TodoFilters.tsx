"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TodoStatus } from '../types'

interface TodoFiltersProps {
  onStatusFilter: (status: TodoStatus | 'ALL') => void;
  onSortChange: (sort: 'deadline') => void;
}

export default function TodoFilters({ onStatusFilter, onSortChange }: TodoFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <Select onValueChange={onStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="WORKING">Working</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deadline">Deadline</SelectItem>
          <SelectItem value="created">Created Date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}