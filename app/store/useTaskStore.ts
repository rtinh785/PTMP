import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, TaskForm, Status } from '~/@types'

const uid = (): string => `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

interface TaskStore {
  tasks: Task[]

  // CRUD
  addTask: (form: TaskForm) => void
  updateTask: (id: string, form: TaskForm) => void
  deleteTask: (id: string) => void
  changeStatus: (id: string, status: Status) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (form) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...form,
              id: uid(),
              createdAt: new Date().toISOString()
            }
          ]
        })),

      updateTask: (id, form) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...form } : t))
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id)
        })),

      changeStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t))
        }))
    }),
    {
      name: 'taskify-storage'
    }
  )
)
