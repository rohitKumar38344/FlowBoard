// const tasks = [
//   {
//     id: "t1",
//     title: "Introduction to store",
//     description:
//       "In the previous section, we created a root reducer using combineReducers",
//     columnId: "c1",
//     subtaskIds: ["s1"],
//   },
//   {
//     id: "t2",
//     title: "Creating store",
//     description: "Every Redux store has a single root reducer function.",
//     columnId: "c2",
//     subtaskIds: ["s2"],
//   },
// ];

// const columns = [
//   {
//     id: "c1",
//     title: "Todo",
//     boardId: "b1",
//     taskIds: ["t1"],
//   },
//   {
//     id: "c2",
//     title: "Doing",
//     boardId: "b1",
//     taskIds: ["t2"],
//   },
// ];

export const transform = function (taskIds,tasks) {
  let final = [];
  taskIds.forEach(tId => {
    final.push(tasks.find(task => task.id === tId))
  })
  return final;
};

// console.log(transform(columns[0].taskIds));
