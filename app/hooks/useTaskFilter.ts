import { useMemo } from 'react'
import { Status } from '~/@types'
import type { FilterState, TaskStats, Task } from '~/@types'
import { useTaskStore } from '~/store/useTaskStore'

const isOverdue = (deadline: string, status: Status): boolean =>
  !!deadline &&
  status !== Status.DONE &&
  new Date(deadline) < new Date() &&
  new Date(deadline).toDateString() !== new Date().toDateString()

const isNear = (deadline: string, status: Status): boolean => {
  if (!deadline || status === Status.DONE) return false
  const diff = new Date(deadline).getTime() - Date.now()
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000 // trong 3 ngày
}

export { isOverdue, isNear }

export function useTaskFilter(filter: FilterState) {
  const tasks = useTaskStore((state) => state.tasks)

  const stats: TaskStats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === Status.TODO).length,
      prog: tasks.filter((t) => t.status === Status.IN_PROGRESS).length,
      done: tasks.filter((t) => t.status === Status.DONE).length,
      over: tasks.filter((t) => isOverdue(t.deadline, t.status)).length,
      near: tasks.filter((t) => isNear(t.deadline, t.status)).length
    }),
    [tasks]
  )

  const filtered: Task[] = useMemo(() => {
    const q = filter.search.toLowerCase()
    return tasks.filter((t) => {
      const matchSearch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      const matchStatus = filter.status === 'All' || t.status === filter.status
      const matchPriority = filter.priority === 'All' || t.priority === filter.priority
      return matchSearch && matchStatus && matchPriority
    })
  }, [tasks, filter])

  const byStatus = (status: Status): Task[] => filtered.filter((t) => t.status === status)

  return { stats, filtered, byStatus }
}
