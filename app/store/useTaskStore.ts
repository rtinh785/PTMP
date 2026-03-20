import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, TaskFormType, Status } from '~/@types'

interface TaskStore {
  tasks: Task[]

  addTask: (form: TaskFormType) => void
  updateTask: (id: string, form: TaskFormType) => void
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
              id: crypto.randomUUID(),
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
