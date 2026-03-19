import { Status, Priority } from '~/@types'
import type { TaskForm } from '~/@types'

export interface StatusMeta {
  label: string
  color: string
  bg: string
  border: string
  dot: string
  accent: string
}

export interface PriorityMeta {
  color: string
}

export const STATUS_META: Record<Status, StatusMeta> = {
  [Status.TODO]: {
    label: 'To Do',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
    accent: 'bg-indigo-400'
  },
  [Status.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    accent: 'bg-amber-400'
  },
  [Status.DONE]: {
    label: 'Done',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    accent: 'bg-emerald-400'
  }
}

export const PRIORITY_META: Record<Priority, PriorityMeta> = {
  [Priority.LOW]: { color: 'text-slate-400' },
  [Priority.MEDIUM]: { color: 'text-amber-500' },
  [Priority.HIGH]: { color: 'text-red-500' }
}

export const EMPTY_FORM: TaskForm = {
  title: '',
  description: '',
  status: Status.TODO,
  priority: Priority.MEDIUM,
  deadline: ''
}
