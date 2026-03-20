# ✦ Taskify — Personal Task Management

A clean, minimal task management app built with React Router v7 (SPA mode), Zustand, and Tailwind CSS v4. All data is persisted in the browser via `localStorage`.

## Features

- ✅ **Task CRUD** — Tạo, sửa, xóa task với form validation (Yup + React Hook Form)
- 📊 **Dashboard** — Thống kê tổng quan (tổng task, đang làm, hoàn thành, quá hạn) kèm progress bar
- 🔍 **Filter & Search** — Lọc task theo trạng thái, độ ưu tiên, tìm kiếm theo tên/mô tả
- 🔃 **Sort** — Sắp xếp task theo deadline, độ ưu tiên, ngày tạo
- 🏷️ **Status workflow** — 3 trạng thái: To Do → In Progress → Done, click chuyển nhanh
- ⏰ **Deadline tracking** — Hiển thị chip cảnh báo: bình thường / sắp hết hạn / quá hạn
- 💾 **Persistent storage** — Dữ liệu lưu trên `localStorage` qua Zustand persist middleware
- 🔔 **Toast notifications** — Thông báo khi tạo, sửa, xóa task (Sonner)

## Tech Stack

| Layer     | Technology                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Framework | [React Router v7](https://reactrouter.com/) (SPA mode, `ssr: false`)                                 |
| UI        | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)                    |
| State     | [Zustand](https://zustand.docs.pmnd.rs/) with `persist` middleware                                   |
| Form      | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)              |
| Date      | [date-fns](https://date-fns.org/)                                                                    |
| Toast     | [Sonner](https://sonner.emilkowal.dev/)                                                              |
| Utils     | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| Build     | [Vite](https://vite.dev/)                                                                            |
| Language  | TypeScript (strict mode)                                                                             |

## Project Structure

```
app/
├── @types/             # TypeScript type definitions (Task, Status, Priority, FilterState, SortState, etc.)
├── components/
│   ├── ui/             # shadcn/ui components (Select, etc.)
│   ├── DeadlineChip    # Deadline badge with overdue/near/normal variants
│   ├── Field           # Reusable form field wrapper
│   ├── IconBtn         # Small icon button (edit, delete)
│   ├── Modal           # Overlay modal with Escape & backdrop close
│   ├── PriorityLabel   # Priority indicator (Low/Medium/High)
│   ├── StatCard        # Dashboard stat card
│   ├── StatusPill      # Status badge (To Do / In Progress / Done)
│   ├── StatusSection   # Collapsible section grouping tasks by status
│   ├── TaskForm        # Add/Edit form with validation
│   └── TaskRow         # Single task row with cycle-status, edit, delete
├── constants/          # STATUS_META, PRIORITY_META, EMPTY_FORM
├── hooks/
│   └── useTaskFilter   # Filter/sort logic, stats computation, overdue/near helpers
├── libs/
│   └── cn              # clsx + tailwind-merge utility
├── routes/
│   └── home.tsx        # Main dashboard page
├── schema/
│   └── taskSchema      # Yup validation schema
├── store/
│   └── useTaskStore    # Zustand store (addTask, updateTask, deleteTask, changeStatus)
├── app.css             # Tailwind CSS imports & theme
├── root.tsx            # App shell (Layout, ErrorBoundary, Toaster)
└── routes.ts           # Route config (single index route)
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/rtinh785/PTMP.git
cd PTMP

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

App sẽ chạy tại `http://localhost:3000`.

### Build & Preview

```bash
# Build for production (SPA)
npm run build

# Preview production build
npm run start:csr
```

Production preview sẽ chạy tại `http://localhost:3001`.

## Available Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start dev server (port 3000) với HMR |
| `npm run build`        | Build production                     |
| `npm run start:csr`    | Preview SPA build (port 3001)        |
| `npm run typecheck`    | Type-check với TypeScript            |
| `npm run lint`         | Kiểm tra lỗi ESLint                  |
| `npm run lint:fix`     | Tự động fix lỗi ESLint               |
| `npm run prettier`     | Kiểm tra format Prettier             |
| `npm run prettier:fix` | Tự động format Prettier              |

---

## Technical Decisions

### 1. React Router v7 thay vì Next.js hay Vite + React thuần

Đề bài yêu cầu SPA nên chọn React Router v7 với `ssr: false`. So với Next.js thì nhẹ hơn, không có overhead của SSR/RSC. So với Vite + React thuần thì có sẵn routing, file-based convention, và type-safe route params nếu cần mở rộng thêm trang sau này.

### 2. Zustand thay vì Redux hay Context API

Zustand có boilerplate tối thiểu — chỉ cần 1 file `useTaskStore.ts` là đủ toàn bộ global state. `persist` middleware tích hợp sẵn giúp sync với `localStorage` tự động mà không cần viết thêm bất kỳ logic nào. Context API không có built-in persistence và dễ gây re-render không cần thiết khi state lớn hơn.

### 3. React Hook Form + Yup thay vì controlled inputs

Controlled inputs với `useState` cho mỗi field sẽ re-render component mỗi lần gõ. React Hook Form dùng uncontrolled inputs — chỉ re-render khi submit hoặc khi có lỗi. Yup tách biệt validation logic ra khỏi component, dễ test và tái sử dụng. Schema `taskSchema.ts` cũng handle edge case như deadline cũ khi edit (so sánh với `initialDeadline` qua context).

### 4. date-fns thay vì `new Date()` thủ công

Các phép tính ngày tháng bằng `getTime()` thủ công dễ sai với múi giờ và edge case (đầu/cuối ngày). `date-fns` cung cấp các hàm rõ nghĩa như `isPast`, `isToday`, `isWithinInterval`, `addDays` — code dễ đọc và ít bug hơn.

### 5. `cn` utility (clsx + tailwind-merge)

Tailwind có vấn đề conflict class khi dùng conditional — ví dụ `border-slate-200 border-red-300` cùng lúc browser không biết dùng cái nào. `tailwind-merge` resolve conflict, `clsx` xử lý falsy values. Gộp vào hàm `cn()` để dùng nhất quán toàn project.

### 6. Stats tính trên toàn bộ tasks, không bị ảnh hưởng bởi filter

Dashboard stats (tổng, done, overdue...) luôn reflect thực tế — không thay đổi khi user đang search hay filter. Chỉ danh sách task bên dưới mới bị ảnh hưởng bởi filter. Đây là UX decision để stats luôn đáng tin cậy.

### 7. Sort kết hợp với filter trong cùng `useTaskFilter`

Sort được apply sau filter — kết quả filter xong mới sort. Tách riêng thành hook để `home.tsx` không chứa logic phức tạp, chỉ quản lý UI state (modal, filter, sort).

---

## What I Would Improve

### Nếu có thêm thời gian, những thứ sẽ được cải thiện:

**1. Dark mode**
Hiện tại UI dùng màu cứng (light only). Sẽ migrate sang CSS variables + Tailwind `dark:` class, dùng `next-themes` để toggle và persist preference.

**2. Optimistic updates & undo**
Khi xóa task, hiện toast với nút "Undo" trong vài giây. Nếu user bấm Undo thì restore lại task, không thì xóa hẳn.

**3. Export data**
Cho phép export danh sách task ra CSV hoặc JSON để backup hoặc import sang app khác.

---

Built with ❤️ using React Router, Zustand & Tailwind CSS.
