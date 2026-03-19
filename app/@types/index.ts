export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  deadline: string
  createdAt: string
}

export type TaskFormType = Omit<Task, 'id' | 'createdAt'>

export interface TaskStats {
  total: number
  todo: number
  prog: number
  done: number
  over: number
  near: number
}

export interface FilterState {
  search: string
  status: Status | 'All'
  priority: Priority | 'All'
}

export type ModalState = null | 'add' | Task
