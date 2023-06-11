import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const SelectedVendor = createSlice({
  name: "selectedEmployee",
  initialState: {
    value: initialState,
  },
  reducers: {
    setSelectedVendor: (state, action) => {
      state.value = action.payload;
    },
    resetSelectedVendor: (state) => {
      state.value = initialState;
    },
  },
});

export const { setSelectedVendor, resetSelectedVendor } =
  SelectedVendor.actions;
export default SelectedVendor.reducer;
