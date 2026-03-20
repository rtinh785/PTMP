import * as yup from 'yup'
import { Priority, Status } from '~/@types'

export const taskSchema = yup.object({
  title: yup
    .string()
    .required('Tên công việc không được để trống')
    .min(3, 'Tên công việc phải có ít nhất 3 ký tự')
    .max(100, 'Tên công việc không được quá 100 ký tự'),

  description: yup.string().max(500, 'Mô tả không được quá 500 ký tự').default(''),

  status: yup
    .mixed<Status>()
    .oneOf(Object.values(Status), 'Trạng thái không hợp lệ')
    .required('Vui lòng chọn trạng thái'),

  priority: yup
    .mixed<Priority>()
    .oneOf(Object.values(Priority), 'Độ ưu tiên không hợp lệ')
    .required('Vui lòng chọn độ ưu tiên'),

  deadline: yup
    .string()
    .default('')
    .test('is-future-date', 'Deadline phải là ngày trong tương lai', (value) => {
      return new Date(value) > new Date()
    })
})

export type TaskSchemaType = yup.InferType<typeof taskSchema>
