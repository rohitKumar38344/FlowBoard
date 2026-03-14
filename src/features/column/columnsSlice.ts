import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectActiveBoardId } from "../board/boardSlice";

const initialState = {
  entites: {},
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumns: (state, action) => {
        
    }
  },
});

export default columnsSlice.reducer;
export const selectColumns = (state) => state.columns.entities;
export const selectColumnsByActiveBoardId = createSelector(
  [selectActiveBoardId, selectColumns],
  function(activeBoardId, columns){
    const cols = Object.values(columns);
    const nextCols = cols.filter(column => column.boardId === activeBoardId);

    
    console.log('cols',nextCols)
    return nextCols;  
  }
)
/*
{
    "c1": {
        "id": "c1",
        "title": "Todo",
        "boardId": "b1",
        "taskIds": [
            "t1"
        ]
    },
    "c2": {
        "id": "c2",
        "title": "Doing",
        "boardId": "b1",
        "taskIds": [
            "t2"
        ]
    },
    "c3": {
        "id": "c3",
        "title": "Done",
        "boardId": "b1",
        "taskIds": [
            "t3"
        ]
    }
}
*/