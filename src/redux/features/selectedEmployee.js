import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const SelectedEmployee = createSlice({
  name: "selectedEmployee",
  initialState: {
    value: initialState,
  },
  reducers: {
    setSelectedEmployee: (state, action) => {
      state.value = action.payload;
    },
    resetSelectedEmployee: (state) => {
      state.value = initialState;
    },
  },
});

export const { setSelectedEmployee, resetSelectedEmployee } =
  SelectedEmployee.actions;
export default SelectedEmployee.reducer;
