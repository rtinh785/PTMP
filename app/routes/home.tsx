import { useState } from 'react'
import type { ModalState, FilterState, Task } from '~/@types'
import { Status, Priority } from '~/@types'
import Modal from '~/components/Modal'
import StatusSection from '~/components/StatusSection'

import { STATUS_META } from '~/constants'
import { useTaskFilter } from '~/hooks/useTaskFilter'
import { useTaskStore } from '~/store/useTaskStore'
import type { Route } from './+types/home'
import StatCard from '~/components/StatCard'
import TaskForm from '~/components/TaskForm'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const inputCls = `px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
  text-slate-800 text-sm outline-none focus:border-indigo-400 focus:bg-white
  transition-all duration-150`

export default function Home() {
  const [modal, setModal] = useState<ModalState>(null)
  const [delId, setDelId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    status: 'All',
    priority: 'All'
  })

  const { addTask, updateTask, deleteTask } = useTaskStore()

  const { stats, byStatus } = useTaskFilter(filter)

  const setF = <K extends keyof FilterState>(key: K, val: FilterState[K]) => setFilter((f) => ({ ...f, [key]: val }))

  const hasFilter = filter.search || filter.status !== 'All' || filter.priority !== 'All'
  const donePct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0

  return (
    <>
      <div className='min-h-screen bg-[#f4f5f9]'>
        {/* HEADER */}
        <header className='bg-white border-b border-slate-100 sticky top-0 z-50'>
          <div className='max-w-5xl mx-auto px-6 h-14 flex items-center justify-between'>
            <div className='flex items-center gap-2.5'>
              <div
                className='size-7.5 bg-indigo-600 rounded-[9px]
                flex items-center justify-center text-white font-black text-sm'
              >
                ✦
              </div>
              <span
                className='font-black text-[18px] text-slate-800 tracking-tight'
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Taskify
              </span>
            </div>
            <button
              onClick={() => setModal('add')}
              className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600
                text-white text-sm font-bold hover:bg-indigo-700 transition-colors
                shadow shadow-indigo-200'
            >
              <span className='text-lg leading-none'>+</span> Thêm task
            </button>
          </div>
        </header>

        <main className='max-w-5xl mx-auto px-6 py-7 pb-16'>
          {/* PAGE TITLE */}
          <div className='flex items-baseline gap-3 mb-5'>
            <h1
              className='font-black text-[26px] text-slate-800 tracking-tight'
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Dashboard
            </h1>
            <span className='text-sm text-slate-400 font-medium'>
              {new Date().toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* STAT CARDS */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-4'>
            <StatCard
              value={stats.total}
              label='Tổng số task'
              icon='📋'
              sub={`${stats.done} đã hoàn thành`}
              valueColor='text-indigo-600'
              barColor='bg-indigo-400'
            />
            <StatCard
              value={stats.prog}
              label='Đang thực hiện'
              icon='⚡'
              sub='In Progress'
              valueColor='text-amber-500'
              barColor='bg-amber-400'
            />
            <StatCard
              value={stats.done}
              label='Hoàn thành'
              icon='✅'
              sub={`${donePct}% tổng số`}
              valueColor='text-emerald-600'
              barColor='bg-emerald-400'
            />
            <StatCard
              value={stats.over}
              label='Quá hạn'
              icon='🔥'
              sub={stats.over > 0 ? 'Cần xử lý ngay!' : 'Đúng hạn 👌'}
              valueColor='text-red-500'
              barColor='bg-red-400'
            />
          </div>

          {/* PROGRESS CARD */}
          {stats.total > 0 && (
            <div className='bg-white border border-slate-100 rounded-2xl px-5 py-4 mb-6 shadow-sm'>
              <div className='flex justify-between items-center mb-3'>
                <span className='text-[13px] font-bold text-slate-500'>Tiến độ tổng thể</span>
                <span className='text-[13px] font-black text-indigo-600'>{donePct}% hoàn thành</span>
              </div>
              <div className='flex h-2 rounded-full overflow-hidden bg-slate-100'>
                <div className='bg-emerald-400 transition-all duration-700' style={{ flex: stats.done }} />
                <div className='bg-amber-400  transition-all duration-700' style={{ flex: stats.prog }} />
                <div className='bg-indigo-200 transition-all duration-700' style={{ flex: stats.todo }} />
              </div>
              <div className='flex flex-wrap gap-4 mt-3'>
                {[
                  { label: 'To Do', dot: 'bg-indigo-400', count: stats.todo },
                  { label: 'In Progress', dot: 'bg-amber-400', count: stats.prog },
                  { label: 'Done', dot: 'bg-emerald-400', count: stats.done }
                ].map((x) => (
                  <div key={x.label} className='flex items-center gap-1.5'>
                    <span className={`w-2 h-2 rounded-full ${x.dot}`} />
                    <span className='text-[11px] text-slate-500 font-semibold'>
                      {x.label} ({x.count})
                    </span>
                  </div>
                ))}
                {stats.near > 0 && (
                  <span className='ml-auto text-[11px] text-amber-600 font-bold'>⏰ {stats.near} task sắp hết hạn</span>
                )}
              </div>
            </div>
          )}

          {/* FILTER BAR */}
          <div className='flex flex-wrap gap-2.5 mb-5'>
            <div className='relative flex-1 min-w-[180px]'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm pointer-events-none'>
                🔍
              </span>
              <input
                className={`${inputCls} w-full pl-9`}
                placeholder='Tìm tên hoặc mô tả...'
                value={filter.search}
                onChange={(e) => setF('search', e.target.value)}
              />
            </div>
            <select
              className={inputCls}
              value={filter.status}
              onChange={(e) => setF('status', e.target.value as Status | 'All')}
            >
              <option value='All'>Tất cả trạng thái</option>
              {Object.values(Status).map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s].label}
                </option>
              ))}
            </select>
            <select
              className={inputCls}
              value={filter.priority}
              onChange={(e) => setF('priority', e.target.value as Priority | 'All')}
            >
              <option value='All'>Tất cả ưu tiên</option>
              {Object.values(Priority).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {hasFilter && (
              <button
                onClick={() => setFilter({ search: '', status: 'All', priority: 'All' })}
                className='px-3 py-2 rounded-xl border border-slate-200 text-slate-400
                  text-xs font-bold hover:bg-slate-50 transition-colors whitespace-nowrap'
              >
                Xóa bộ lọc ✕
              </button>
            )}
          </div>

          {/* TASK LIST */}
          <div className='bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm'>
            <div className='px-5 py-3 border-b border-slate-100 flex items-center justify-between'>
              <span className='text-[13px] font-bold text-slate-400'>Danh sách task</span>
              <span className='text-[11px] text-slate-300'>{stats.total} task tổng cộng</span>
            </div>
            <div className='p-2'>
              {Object.values(Status).map((s) => (
                <StatusSection
                  key={s}
                  status={s}
                  tasks={byStatus(s)}
                  onEdit={(task: Task) => setModal(task)}
                  onDelete={(id: string) => setDelId(id)}
                  defaultOpen={s !== Status.DONE}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ADD / EDIT MODAL */}
      {modal && (
        <Modal title={modal === 'add' ? 'Tạo công việc mới' : 'Chỉnh sửa công việc'} onClose={() => setModal(null)}>
          <TaskForm
            initial={modal === 'add' ? undefined : modal}
            onSave={(form) => (modal === 'add' ? addTask(form) : updateTask((modal as Task).id, form))}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {/* DELETE CONFIRM */}
      {delId && (
        <Modal title='Xác nhận xóa' onClose={() => setDelId(null)}>
          <p className='text-sm text-slate-500 leading-relaxed mb-5'>
            Task này sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn có chắc không?
          </p>
          <div className='flex gap-2 justify-end'>
            <button
              onClick={() => setDelId(null)}
              className='px-4 py-2 rounded-xl border border-slate-200 text-slate-500
                text-sm font-semibold hover:bg-slate-50 transition-colors'
            >
              Hủy
            </button>
            <button
              onClick={() => {
                deleteTask(delId)
                setDelId(null)
              }}
              className='px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-bold
                hover:bg-red-600 transition-colors'
            >
              Xóa task
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
