import { cn } from '~/libs/cn'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export type DeadlineVariant = 'normal' | 'near' | 'overdue'

interface Props {
  date: string
  variant?: DeadlineVariant
}

const STYLES: Record<DeadlineVariant, string> = {
  normal: 'bg-slate-50 text-slate-400 border-slate-200',
  near: 'bg-amber-50 text-amber-600 border-amber-200',
  overdue: 'bg-red-50 text-red-600 border-red-200'
}
const ICONS: Record<DeadlineVariant, string> = {
  normal: '📅',
  near: '⏰',
  overdue: '⚠'
}
const DeadlineChip = ({ date, variant = 'normal' }: Props) => {
  if (!date) return null
  const formatted = format(new Date(date), 'dd MMM', { locale: vi })
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md',
        'text-[11px] font-semibold border',
        STYLES[variant]
      )}
    >
      {ICONS[variant]} {formatted}
    </span>
  )
}

export default DeadlineChip
