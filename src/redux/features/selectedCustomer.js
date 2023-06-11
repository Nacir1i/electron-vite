import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectedCustomer = createSlice({
  name: "seletecCustomer",
  initialState: {
    value: initialState,
  },
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.value = action.payload;
    },
    resetSelectedCustomer: (state) => {
      state.value = initialState;
    },
  },
});

export const { setSelectedCustomer, resetSelectedCustomer } =
  selectedCustomer.actions;
export default selectedCustomer.reducer;
