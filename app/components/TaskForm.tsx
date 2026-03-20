import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import type { Task } from '~/@types'
import { Status, Priority } from '~/@types'
import { cn } from '~/libs/cn'
import { taskSchema, type TaskSchemaType } from '~/schema/taskSchema'

interface Props {
  initial?: Task
  onSave: (form: TaskSchemaType) => void
  onClose: () => void
}

export function TaskForm({ initial, onSave, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskSchemaType>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      status: initial?.status ?? Status.TODO,
      priority: initial?.priority ?? Priority.MEDIUM,
      deadline: initial?.deadline ?? ''
    }
  })

  const getInputCls = (hasError: boolean) =>
    cn(
      'w-full px-3 py-2.5 bg-slate-50 border rounded-xl',
      'text-slate-800 text-sm outline-none',
      'focus:bg-white transition-all duration-150',
      hasError ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-indigo-400'
    )

  const onSubmit = (data: TaskSchemaType) => {
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label
          className='block text-[11px] font-bold text-slate-400
          uppercase tracking-widest mb-1.5'
        >
          Tên công việc
        </label>
        <input
          {...register('title')}
          className={getInputCls(!!errors.title)}
          placeholder='Nhập tên công việc...'
          autoFocus
        />

        {errors.title && <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.title.message}</p>}
      </div>

      <div className='mb-4'>
        <label
          className='block text-[11px] font-bold text-slate-400
          uppercase tracking-widest mb-1.5'
        >
          Mô tả
        </label>
        <textarea
          {...register('description')}
          className={cn(getInputCls(!!errors.description), 'resize-y min-h-20')}
          placeholder='Mô tả ngắn gọn (tuỳ chọn)...'
        />
        {errors.description && (
          <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.description.message}</p>
        )}
      </div>

      <div className='grid grid-cols-3 gap-3 mb-4'>
        <div>
          <label
            className='block text-[11px] font-bold text-slate-400
            uppercase tracking-widest mb-1.5'
          >
            Trạng thái
          </label>
          <select {...register('status')} className={cn(getInputCls(!!errors.status), 'cursor-pointer')}>
            <option value={Status.TODO}>To Do</option>
            <option value={Status.IN_PROGRESS}>In Progress</option>
            <option value={Status.DONE}>Done</option>
          </select>
          {errors.status && <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.status.message}</p>}
        </div>

        <div>
          <label
            className='block text-[11px] font-bold text-slate-400
            uppercase tracking-widest mb-1.5'
          >
            Ưu tiên
          </label>
          <select {...register('priority')} className={cn(getInputCls(!!errors.priority), 'cursor-pointer')}>
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.HIGH}>High</option>
          </select>
          {errors.priority && <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.priority.message}</p>}
        </div>

        <div>
          <label
            className='block text-[11px] font-bold text-slate-400
            uppercase tracking-widest mb-1.5'
          >
            Deadline
          </label>
          <input type='date' {...register('deadline')} className={getInputCls(!!errors.deadline)} />
          {errors.deadline && <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.deadline.message}</p>}
        </div>
      </div>

      <div className='flex gap-2 justify-end'>
        <button
          type='button'
          onClick={onClose}
          className='px-4 py-2 rounded-xl border border-slate-200 text-slate-500
            text-sm font-semibold hover:bg-slate-50 transition-colors'
        >
          Hủy
        </button>
        <button
          type='submit'
          className='px-5 py-2 rounded-xl text-sm font-bold transition-colors
            bg-indigo-600 text-white hover:bg-indigo-700 shadow shadow-indigo-200'
        >
          {initial ? 'Lưu thay đổi' : 'Tạo task'}
        </button>
      </div>
    </form>
  )
}
