import { useMemo } from 'react'
import { Status } from '~/@types'
import type { FilterState, TaskStats, Task, SortState } from '~/@types'
import { useTaskStore } from '~/store/useTaskStore'
import { isPast, isToday, isWithinInterval, addDays } from 'date-fns'

export const isOverdue = (deadline: string, status: Status): boolean => {
  if (!deadline || status === Status.DONE) return false
  const date = new Date(deadline)
  return isPast(date) && !isToday(date)
}

export const isNear = (deadline: string, status: Status): boolean => {
  if (!deadline || status === Status.DONE) return false
  const date = new Date(deadline)
  return isWithinInterval(date, {
    start: new Date(),
    end: addDays(new Date(), 3)
  })
}

export function useTaskFilter(filter: FilterState, sort: SortState) {
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

    const result = tasks.filter((t) => {
      const matchSearch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      const matchStatus = filter.status === 'All' || t.status === filter.status
      const matchPriority = filter.priority === 'All' || t.priority === filter.priority
      return matchSearch && matchStatus && matchPriority
    })

    return result.sort((a, b) => {
      const dir = sort.order === 'asc' ? 1 : -1

      if (sort.field === 'deadline') {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return (new Date(a.deadline).getTime() - new Date(b.deadline).getTime()) * dir
      }

      if (sort.field === 'priority') {
        const priorityOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 }
        return (priorityOrder[a.priority] - priorityOrder[b.priority]) * dir
      }

      if (sort.field === 'createdAt') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir
      }

      return 0
    })
  }, [tasks, filter, sort])

  const byStatus = useMemo(() => {
    return (status: Status) => filtered.filter((t) => t.status === status)
  }, [filtered])

  return { stats, filtered, byStatus }
}
