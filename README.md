# 🎯 FlowBoard

A modern, feature-rich kanban board application built with cutting-edge web technologies. Organize, manage, and track your tasks with a sleek drag-and-drop interface and persistent local storage.

## ✨ Features

### ✅ Currently Available

- **Responsive UI** - Beautiful, modern interface built with React 19 and Tailwind CSS
- **Form Management** - Robust form handling with React Hook Form and Zod validation
- **State Management** - Efficient state management with Redux Toolkit
- **UI Components** - Accessible components from Radix UI with shadcn styling
- **Icons** - Beautiful icon set from Lucide React
- **Notifications** - Toast notifications with Sonner
- **Routing** - Seamless navigation with React Router DOM
- **Code Quality** - ESLint and Prettier for consistent code formatting

### 🚀 Upcoming Features

- **🔄 Drag & Drop** - Intuitive drag-and-drop functionality (In Development)
  - Reorder tasks within columns
  - Move tasks between columns
  - Smooth animations and visual feedback
- **💾 Local Storage** - Persistent data storage (In Development)
  - Auto-save functionality
  - Data persistence across sessions
  - Seamless data recovery

## 🛠️ Tech Stack

### Frontend Framework & UI

- **React 19.2** - Modern React with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Lightning-fast build tool with HMR

### State Management & Forms

- **Redux Toolkit 2.11** - Predictable state management
- **React Redux 9.2** - React bindings for Redux
- **React Hook Form 7.71** - Performant form handling
- **Zod 4.3** - TypeScript-first schema validation
- **@hookform/resolvers 5.2** - Form validation resolvers

### UI & Styling

- **Tailwind CSS 4.2** - Utility-first CSS framework
- **Radix UI 1.4** - Unstyled, accessible components
- **shadcn/ui** - Beautiful component library built on Radix UI
- **Lucide React 0.577** - Consistent icon library
- **Class Variance Authority 0.7** - CSS-in-JS for flexible styling
- **clsx & tailwind-merge** - Utility functions for className management

### Drag & Drop (Foundation Ready)

- **@dnd-kit/core 6.3** - Headless drag & drop library
- **use-immer 0.11** - Immutable state updates

### Additional Features

- **React Router DOM 7.13** - Client-side routing
- **Sonner 2.0** - Toast notifications
- **@fontsource-variable/Geist 5.2** - Beautiful variable font

### Development Tools

- **ESLint 9.39** - Code linting with React-specific rules
- **Prettier 3.8** - Code formatting
- **TypeScript ESLint 8.46** - TypeScript linting
- **Commitizen 4.3** - Conventional commits
- **Husky 9.1** - Git hooks automation
- **Commitlint 20.2** - Commit message linting

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/rohitKumar38344/FlowBoard.git
cd FlowBoard

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot module replacement
npm run dev

# The application will be available at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code with Prettier
npm run format

# Create conventional commit
npm run commit
```

## 📊 Project Statistics

- **Language Composition:**
  - TypeScript: 96.3%
  - CSS: 3%
  - Other: 0.7%

## 🎨 Architecture Highlights

- **Type-Safe Development** - Full TypeScript support for catch errors at compile time
- **Component-Based** - Modular architecture with reusable components
- **Performance Optimized** - Vite's fast build times and optimized bundle size
- **Accessible** - Built with Radix UI for WCAG compliance
- **Scalable** - Redux Toolkit for predictable state management
- **Developer Experience** - ESLint, Prettier, and Husky for code quality

## 📝 Git Workflow

This project uses conventional commits with Commitizen integration:

```bash
npm run commit
```

This ensures clean, readable commit history and automated changelog generation.
