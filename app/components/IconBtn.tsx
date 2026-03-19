interface Props {
  icon: string
  title: string
  danger?: boolean
  onClick?: () => void
}
const IconBtn = ({ icon, title, danger = false, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-lg
        text-slate-300 transition-all duration-150
        ${danger ? 'hover:bg-red-50 hover:text-red-500' : 'hover:bg-indigo-50 hover:text-indigo-500'}`}
    >
      {icon}
    </button>
  )
}

export default IconBtn
