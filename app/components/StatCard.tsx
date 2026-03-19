interface Props {
  value: number
  label: string
  icon: string
  valueColor: string // Tailwind text color class
  barColor: string // Tailwind bg color class
  sub?: string // dòng phụ nhỏ bên dưới, optional
}
const StatCard = ({ value, label, icon, valueColor, barColor, sub }: Props) => {
  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-5 relative overflow-hidden shadow-sm'>
      {/* Accent bar trên cùng */}
      <div className={`absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl ${barColor}`} />

      <div className='text-[22px] mb-2'>{icon}</div>

      <div
        className={`text-[36px] font-black leading-none tracking-tighter ${valueColor}`}
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {value}
      </div>

      <div className='text-[13px] font-semibold text-slate-500 mt-1.5'>{label}</div>

      {sub && <div className='text-[11px] text-slate-400 mt-0.5'>{sub}</div>}
    </div>
  )
}

export default StatCard
