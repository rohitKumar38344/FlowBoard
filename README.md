# FlowBoard

A Kanban board application for managing tasks across multiple projects. Create boards, organise work into columns, and track progress — all saved automatically to your browser's local storage with no account needed.

**[Live Demo →](https://flow-board-eosin.vercel.app/)**

![FlowBoard screenshot](./src/design/flowboard.png)

---

## Features

- **Multiple boards** — create and switch between separate project boards
- **Column management** — add, edit, and delete columns per board
- **Task management** — create tasks with descriptions, subtasks, and status
- **Subtask tracking** — mark subtasks complete and see progress on each task card
- **Persistent storage** — all data auto-saved to localStorage, survives page refresh
- **Form validation** — React Hook Form + Zod with real-time error feedback
- **Fully responsive** — works on mobile, tablet, and desktop
- **Accessible** — built on Radix UI primitives, keyboard navigable

---

## Tech Stack

| Category         | Technology                                 |
| ---------------- | ------------------------------------------ |
| Framework        | React 19 + TypeScript 5.9                  |
| Build tool       | Vite 7                                     |
| State management | Redux Toolkit 2 with `createEntityAdapter` |
| Forms            | React Hook Form 7 + Zod 4                  |
| UI components    | shadcn/ui (Radix UI primitives)            |
| Styling          | Tailwind CSS 4                             |
| Routing          | React Router DOM 7                         |
| Notifications    | Sonner                                     |
| Code quality     | ESLint, Prettier, Husky, Commitlint        |

---

## Architecture

State is normalised using Redux Toolkit's `createEntityAdapter` across four slices — boards, columns, tasks, and subtasks. Each slice manages its own cleanup via `extraReducers`, so deleting a board cascades correctly through columns, tasks, and subtasks without a single monolithic action.

A custom localStorage middleware persists the full Redux state after every action and rehydrates it on load, giving the app full offline persistence with no backend.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/rohitKumar38344/FlowBoard.git
cd FlowBoard

# Install dependencies
npm install

# Start dev server
npm run dev
# App runs at http://localhost:5173
```

**Other commands:**

```bash
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # run ESLint
npm run format     # run Prettier
npm run commit     # create a conventional commit with Commitizen
```

---

## Project Structure

```
src/
├── app/store/          # Redux store configuration
├── features/
│   ├── board/          # Board slice + components
│   ├── column/         # Column slice + components
│   ├── task/           # Task slice + components
│   └── subtask/        # Subtask slice + components
├── components/
│   ├── Modals/         # Add/Edit board and task modals
│   ├── sidebar/        # App sidebar with board navigation
│   └── ui/             # Reusable shadcn/ui components
├── middlewares/        # localStorage persistence middleware
├── hooks/              # Custom React hooks
├── types/              # Shared TypeScript interfaces
└── utils/              # localStorage save/load helpers
```

---

## Git Workflow

This project uses conventional commits enforced by Commitizen and Commitlint, with Husky running lint checks before every commit.

```bash
npm run commit   # guided conventional commit prompt
```
