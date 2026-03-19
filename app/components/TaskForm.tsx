import { useState } from 'react'
import type { Task, TaskFormType } from '~/@types'
import { Status, Priority } from '~/@types'
import Field from '~/components/Field'
import { EMPTY_FORM } from '~/constants'

interface Props {
  initial?: Task
  onSave: (form: TaskFormType) => void
  onClose: () => void
}

const inputCls = `w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
  text-slate-800 text-sm outline-none focus:border-indigo-400 focus:bg-white
  transition-all duration-150`
const TaskForm = ({ initial, onSave, onClose }: Props) => {
  const [form, setForm] = useState<TaskFormType>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          status: initial.status,
          priority: initial.priority,
          deadline: initial.deadline
        }
      : EMPTY_FORM
  )

  const set = <K extends keyof TaskFormType>(key: K, val: TaskFormType[K]) => setForm((f) => ({ ...f, [key]: val }))

  const valid = form.title.trim().length > 0

  const handleSave = () => {
    if (!valid) return
    onSave(form)
    onClose()
  }

  return (
    <>
      <Field label='Tên công việc *'>
        <input
          className={inputCls}
          value={form.title}
          autoFocus
          placeholder='Nhập tên công việc...'
          onChange={(e) => set('title', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
          }}
        />
      </Field>

      <Field label='Mô tả'>
        <textarea
          className={`${inputCls} resize-y min-h-[80px]`}
          value={form.description}
          placeholder='Mô tả ngắn gọn (tuỳ chọn)...'
          onChange={(e) => set('description', e.target.value)}
        />
      </Field>

      <div className='grid grid-cols-3 gap-3'>
        <Field label='Trạng thái'>
          <select className={inputCls} value={form.status} onChange={(e) => set('status', e.target.value as Status)}>
            {Object.values(Status).map((s) => (
              <option key={s} value={s}>
                {s === Status.TODO ? 'To Do' : s === Status.IN_PROGRESS ? 'In Progress' : 'Done'}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Ưu tiên'>
          <select
            className={inputCls}
            value={form.priority}
            onChange={(e) => set('priority', e.target.value as Priority)}
          >
            {Object.values(Priority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Deadline'>
          <input
            type='date'
            className={inputCls}
            value={form.deadline}
            onChange={(e) => set('deadline', e.target.value)}
          />
        </Field>
      </div>

      <div className='flex gap-2 justify-end mt-1'>
        <button
          onClick={onClose}
          className='px-4 py-2 rounded-xl border border-slate-200 text-slate-500
            text-sm font-semibold hover:bg-slate-50 transition-colors'
        >
          Hủy
        </button>
        <button
          onClick={handleSave}
          disabled={!valid}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors
            ${
              valid
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow shadow-indigo-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          {initial ? 'Lưu thay đổi' : 'Tạo task'}
        </button>
      </div>
    </>
  )
}

export default TaskForm
