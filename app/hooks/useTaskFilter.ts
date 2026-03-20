import { useMemo } from 'react'
import { Status } from '~/@types'
import type { FilterState, TaskStats, Task } from '~/@types'
import { useTaskStore } from '~/store/useTaskStore'
import { isPast, isToday, isWithinInterval, addDays, startOfDay } from 'date-fns'

export const isOverdue = (deadline: string, status: Status): boolean => {
  if (!deadline || status === Status.DONE) return false
  const date = new Date(deadline)
  return isPast(date) && !isToday(date)
}

export const isNear = (deadline: string, status: Status): boolean => {
  if (!deadline || status === Status.DONE) return false
  const date = new Date(deadline)
  return isWithinInterval(date, {
    start: startOfDay(new Date()),
    end: addDays(new Date(), 3)
  })
}

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
