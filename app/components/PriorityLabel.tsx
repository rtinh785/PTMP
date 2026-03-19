import type { Priority } from '~/@types'
import { PRIORITY_META } from '~/constants'

interface Props {
  priority: Priority
}
const PriorityLabel = ({ priority }: Props) => {
  return <span className={`text-[11px] font-bold ${PRIORITY_META[priority].color}`}>● {priority}</span>
}

export default PriorityLabel
