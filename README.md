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

Built with ❤️ using React Router, Zustand & Tailwind CSS.
