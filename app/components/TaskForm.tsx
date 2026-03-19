import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import type { Task } from '~/@types'
import { Status, Priority } from '~/@types'
import { taskSchema, type TaskSchemaType } from '~/schema/taskSchema'

const inputCls = `
  w-full px-3 py-2.5 bg-slate-50 border rounded-xl
  text-slate-800 text-sm outline-none
  focus:bg-white transition-all duration-150
`

interface Props {
  initial?: Task // có → edit mode, không → add mode
  onSave: (form: TaskSchemaType) => void
  onClose: () => void
}

export function TaskForm({ initial, onSave, onClose }: Props) {
  const {
    register,
    // register dùng để nối input với react-hook-form
    // mỗi input gọi {...register("tên field")} là form tự quản lý

    handleSubmit,
    // handleSubmit bọc ngoài onSubmit
    // tự validate trước, nếu pass thì mới gọi hàm bên trong

    formState: { errors }
    // errors chứa lỗi của từng field sau khi validate
    // errors.title?.message = thông báo lỗi của field title
  } = useForm<TaskSchemaType>({
    resolver: yupResolver(taskSchema),
    // nói cho react-hook-form dùng yup để validate

    defaultValues: {
      // nếu có initial (edit mode) thì điền sẵn data vào form
      // không có thì dùng giá trị mặc định
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      status: initial?.status ?? Status.TODO,
      priority: initial?.priority ?? Priority.MEDIUM,
      deadline: initial?.deadline ?? ''
    }
  })

  const onSubmit = (data: TaskSchemaType) => {
    // data ở đây đã pass validate rồi mới vào được đây
    onSave(data)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* handleSubmit tự validate trước khi gọi onSubmit */}

      {/* TITLE */}
      <div className='mb-4'>
        <label
          className='block text-[11px] font-bold text-slate-400
          uppercase tracking-widest mb-1.5'
        >
          Tên công việc *
        </label>
        <input
          {...register('title')}
          // {...register('title')} nối input này với field "title" trong form
          // react-hook-form tự theo dõi value, onChange, onBlur
          className={`${inputCls} ${
            errors.title
              ? 'border-red-300 focus:border-red-400' // có lỗi → viền đỏ
              : 'border-slate-200 focus:border-indigo-400' // không lỗi → viền tím
          }`}
          placeholder='Nhập tên công việc...'
          autoFocus
        />
        {/* Hiện thông báo lỗi nếu có */}
        {errors.title && <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.title.message}</p>}
      </div>

      {/* DESCRIPTION */}
      <div className='mb-4'>
        <label
          className='block text-[11px] font-bold text-slate-400
          uppercase tracking-widest mb-1.5'
        >
          Mô tả
        </label>
        <textarea
          {...register('description')}
          className={`${inputCls} resize-y min-h-20 ${
            errors.description ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-indigo-400'
          }`}
          placeholder='Mô tả ngắn gọn (tuỳ chọn)...'
        />
        {errors.description && (
          <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.description.message}</p>
        )}
      </div>

      {/* STATUS + PRIORITY + DEADLINE */}
      <div className='grid grid-cols-3 gap-3 mb-4'>
        <div>
          <label
            className='block text-[11px] font-bold text-slate-400
            uppercase tracking-widest mb-1.5'
          >
            Trạng thái
          </label>
          <select
            {...register('status')}
            className={`${inputCls} cursor-pointer ${
              errors.status ? 'border-red-300' : 'border-slate-200 focus:border-indigo-400'
            }`}
          >
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
          <select
            {...register('priority')}
            className={`${inputCls} cursor-pointer ${
              errors.priority ? 'border-red-300' : 'border-slate-200 focus:border-indigo-400'
            }`}
          >
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
          <input
            type='date'
            {...register('deadline')}
            className={`${inputCls} ${errors.deadline ? 'border-red-300' : 'border-slate-200 focus:border-indigo-400'}`}
          />
          {errors.deadline && <p className='text-red-400 text-[11px] mt-1 font-medium'>{errors.deadline.message}</p>}
        </div>
      </div>

      {/* BUTTONS */}
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
          // type submit → bấm vào sẽ trigger handleSubmit → validate → onSubmit
          className='px-5 py-2 rounded-xl text-sm font-bold transition-colors
            bg-indigo-600 text-white hover:bg-indigo-700 shadow shadow-indigo-200'
        >
          {initial ? 'Lưu thay đổi' : 'Tạo task'}
        </button>
      </div>
    </form>
  )
}
