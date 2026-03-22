import type { RootState } from "@/app/store/store";

export const saveKanbanData = function (state: RootState) {
  const data = JSON.stringify(state);
  localStorage.setItem("kanbanData", data);
};

export const getKanbanData = function () {
  const data = localStorage.getItem("kanban-data");
  if (!data) return initialFlowbardData;
  return JSON.parse(data);
};

const initialFlowbardData: RootState = {
  boards: {
    ids: ["b1", "b2"],
    activeBoardId: "b1",
    entities: {
      b1: {
        id: "b1",
        name: "Frontend Roadmap",
        columnIds: ["c1", "c2", "c3"],
      },
      b2: {
        id: "b2",
        name: "Personal Errands",
        columnIds: ["c4"],
      },
    },
  },

  columns: {
    ids: ["c1", "c2", "c3", "c4"],
    entities: {
      c1: { id: "c1", boardId: "b1", title: "Todo", taskIds: ["t1", "t2"] },
      c2: { id: "c2", boardId: "b1", title: "Doing", taskIds: ["t3"] },
      c3: { id: "c3", boardId: "b1", title: "Done", taskIds: ["t4"] },
      c4: { id: "c4", boardId: "b2", title: "Urgent", taskIds: ["t5"] },
    },
  },

  tasks: {
    ids: ["t1", "t2", "t3", "t4", "t5"],
    entities: {
      t1: {
        id: "t1",
        columnId: "c1",
        title: "Learn Redux Normalization",
        description: "Understand why flat state is better than nested state.",
        subtaskIds: ["s1", "s2"],
      },
      t2: {
        id: "t2",
        columnId: "c1",
        title: "Master CSS Grid",
        description: "Build a responsive dashboard layout.",
        subtaskIds: [],
      },
      t3: {
        id: "t3",
        columnId: "c2",
        title: "Refactor Kanban Store",
        description: "Implement createEntityAdapter for all slices.",
        subtaskIds: ["s3"],
      },
      t4: {
        id: "t4",
        columnId: "c3",
        title: "Update Resume",
        description: "Add the new Meta-level Redux skills.",
        subtaskIds: [],
      },
      t5: {
        id: "t5",
        columnId: "c4",
        title: "Buy Groceries",
        description: "Milk, eggs, and bread.",
        subtaskIds: [],
      },
    },
  },

  subtasks: {
    ids: ["s1", "s2", "s3"],
    entities: {
      s1: { id: "s1", taskId: "t1", title: "Read Redux Docs", done: true },
      s2: {
        id: "s2",
        taskId: "t1",
        title: "Watch Senior Review Video",
        done: false,
      },
      s3: { id: "s3", taskId: "t3", title: "Write Unit Tests", done: false },
    },
  },
};
