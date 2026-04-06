import { ArrowRight } from 'lucide-react';

export const Index = () => {
  return (
    <div className="grid place-content-center min-h-full px-6 py-10 text-slate-800 dark:text-slate-100">
      <div className="max-w-3xl rounded-3xl border border-slate-200/80 bg-white/90 p-10 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/80">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Welcome to FlowBoard</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Your kanban workspace for faster task flow
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Organize work by boards, track progress across columns, and view task details with a
            single click. Start by choosing an existing board from the sidebar or create a new board
            to begin planning your next sprint.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-700/70 dark:bg-slate-800">
            <h2 className="text-lg font-medium">What you can do</h2>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              <li>• Create boards for projects, teams, or workflows</li>
              <li>• Add tasks, subtasks, and move them across columns</li>
              <li>• Open task details with click-to-view task cards</li>
              <li>• Keep your workflow visual and easy to manage</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-700/70 dark:bg-slate-800">
            <h2 className="text-lg font-medium">Quick tips</h2>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              <li>• Use the sidebar to switch between boards quickly.</li>
              <li>• Click a task to open its detailed view and update progress.</li>
              <li>• Keep subtasks updated to see completion at a glance.</li>
              <li>• Build a board for each major project or team focus area.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Ready to flow?
            </p>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              Select a board from the sidebar and begin organizing tasks in one place.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20">
            <span>Use the sidebar</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
