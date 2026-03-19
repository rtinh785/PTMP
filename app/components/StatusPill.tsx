import type { Status } from '~/@types'
import { STATUS_META } from '~/constants'
interface Props {
  status: Status
}
const StatusPill = ({ status }: Props) => {
  const m = STATUS_META[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
      text-[11px] font-bold tracking-wide border ${m.color} ${m.bg} ${m.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  )
}

export default StatusPill
