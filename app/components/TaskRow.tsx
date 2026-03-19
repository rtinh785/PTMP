import { type Task, Status } from '~/@types'
import DeadlineChip from '~/components/DeadlineChip'
import IconBtn from '~/components/IconBtn'
import PriorityLabel from '~/components/PriorityLabel'
import StatusPill from '~/components/StatusPill'
import { STATUS_META } from '~/constants'
import { isOverdue, isNear } from '~/hooks/useTaskFilter'
import { useTaskStore } from '~/store/useTaskStore'

interface Props {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}
const TaskRow = ({ task, onEdit, onDelete }: Props) => {
  const changeStatus = useTaskStore((s) => s.changeStatus)
  const done = task.status === Status.DONE
  const inProg = task.status === Status.IN_PROGRESS
  const sm = STATUS_META[task.status]

  // Click vào circle → chuyển sang status tiếp theo
  const handleCycleStatus = ({ task, onEdit, onDelete }: Props) => {
    const order = [Status.TODO, Status.IN_PROGRESS, Status.DONE]
    const next = order[(order.indexOf(task.status) + 1) % order.length]
    changeStatus(task.id, next)
  }

  // Tính variant deadline để truyền xuống chip
  const deadlineVariant = isOverdue(task.deadline, task.status)
    ? 'overdue'
    : isNear(task.deadline, task.status)
      ? 'near'
      : 'normal'

  return (
    <div
      className='group flex items-center gap-3 px-4 py-3 rounded-xl
      transition-colors duration-150 hover:bg-slate-50
      border-l-[3px] border-transparent hover:border-indigo-400'
    >
      {/* Circle toggle */}
      <button
        onClick={() => handleCycleStatus({ task, onEdit, onDelete })}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          flex-shrink-0 transition-all duration-150
          ${done ? 'bg-emerald-500 border-emerald-500' : inProg ? 'border-amber-400' : 'border-indigo-400'}`}
      >
        {done && <span className='text-white text-[10px]'>✓</span>}
        {inProg && <span className='w-2 h-2 rounded-full bg-amber-400 block' />}
      </button>

      {/* Nội dung */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 flex-wrap'>
          <span
            className={`font-semibold text-sm text-slate-800
            ${done ? 'line-through opacity-50' : ''}`}
          >
            {task.title}
          </span>
          <StatusPill status={task.status} />
          <PriorityLabel priority={task.priority} />
          <DeadlineChip date={task.deadline} variant={deadlineVariant} />
        </div>
        {task.description && <p className='text-xs text-slate-400 mt-0.5 truncate'>{task.description}</p>}
      </div>

      {/* Actions */}
      <div
        className='flex gap-0.5 opacity-0 group-hover:opacity-100
        transition-opacity duration-150 flex-shrink-0'
      >
        <IconBtn icon='✎' title='Sửa' onClick={() => onEdit(task)} />
        <IconBtn icon='✕' title='Xóa' onClick={() => onDelete(task.id)} danger />
      </div>
    </div>
  )
}

export default TaskRow
