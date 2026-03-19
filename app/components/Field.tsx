interface Props {
  label: string
  children: React.ReactNode
}
const Field = ({ label, children }: Props) => {
  return (
    <div className='mb-4'>
      <label
        className='block text-[11px] font-bold text-slate-400
        uppercase tracking-widest mb-1.5'
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default Field
