import type { RootState } from "../store/store";

export const saveKanbanData = function (state: RootState) {
  const data = JSON.stringify(state);
  localStorage.setItem("kanbanData", data);
};

export const getKanbanData = function () {
  const data = localStorage.getItem("kanban-data");
  if (!data) return kanbanData;
  return JSON.parse(data);
};

const kanbanData = {
  boards: {
    activeBoardId: "b1",
    ids: ["b1"],
    entities: {
      b1: {
        id: "b1",
        name: "Learn Redux fundamentals",
        columnIds: ["c1", "c2", "c3"],
      },
    },
  },

  columns: {
    entities: {
      c1: {
        id: "c1",
        title: "Todo",
        boardId: "b1",
        taskIds: ["t1"],
      },
      c2: {
        id: "c2",
        title: "Doing",
        boardId: "b1",
        taskIds: ["t2"],
      },
      c3: {
        id: "c3",
        title: "Done",
        boardId: "b1",
        taskIds: ["t3"],
      },
    },
  },

  tasks: {
    entities: {
      t1: {
        id: "t1",
        title: "Introduction to store",
        description:
          "In the previous section, we created a root reducer using combineReducers",
        columnId: "c1",
        subtaskIds: ["s1"],
      },
      t2: {
        id: "t2",
        title: "Creating store",
        description: "Every Redux store has a single root reducer function.",
        columnId: "c2",
        subtaskIds: ["s2"],
      },
      t3: {
        id: "t3",
        title: "Dispatch actions",
        description: "Redux store dispatches actions to update state.",
        columnId: "c3",
        subtaskIds: ["s3"],
      },
    },
  },

  subtasks: {
    entities: {
      s1: {
        id: "s1",
        title: "Alpha",
        completed: false,
      },
      s2: {
        id: "s2",
        title: "Beta",
        completed: false,
      },
      s3: {
        id: "s3",
        title: "Gamma",
        completed: false,
      },
    },
  },
};
