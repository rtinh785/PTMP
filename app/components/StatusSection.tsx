import { useState } from 'react'
import type { Status, Task } from '~/@types'
import TaskRow from '~/components/TaskRow'
import { STATUS_META } from '~/constants'
import { cn } from '~/libs/cn'

interface Props {
  status: Status
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  defaultOpen?: boolean
}
const StatusSection = ({ status, tasks, onEdit, onDelete, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen)
  const m = STATUS_META[status]
  return (
    <div className='mb-1'>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg',
          'transition-colors duration-150',
          open ? m.bg : 'hover:bg-slate-50'
        )}
      >
        <span className={`w-2 h-2 rounded-full ${m.dot}`} />
        <span className={`text-[11px] font-black uppercase tracking-widest ${m.color}`}>{m.label}</span>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${m.dot}`}>{tasks.length}</span>
        <span className={cn('ml-auto text-[11px] transition-transform duration-200', m.color, open && 'rotate-90')}>
          ▶
        </span>
      </button>

      {open && (
        <div className='mt-0.5'>
          {tasks.length === 0 ? (
            <p className='text-center text-slate-400 text-sm py-4 italic'>Không có task nào</p>
          ) : (
            tasks.map((t) => <TaskRow key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />)
          )}
        </div>
      )}
    </div>
  )
}

export default StatusSection
