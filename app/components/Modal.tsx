import { useEffect } from 'react'

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
}
const Modal = ({ title, onClose, children }: Props) => {
  // Nhấn Escape để đóng
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className='fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex
        items-center justify-center z-50 p-4'
    >
      <div
        className='bg-white border border-slate-100 rounded-2xl w-full
        max-w-lg p-7 shadow-2xl animate-[modalIn_.2s_ease]'
      >
        <div className='flex justify-between items-center mb-5'>
          <h3 className='text-[17px] font-black text-slate-800'>{title}</h3>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg
              bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors'
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
