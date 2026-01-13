import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entites: {},
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
});

export default columnsSlice.reducer;
export const selectColumns = (state) => state.columns.entities;
