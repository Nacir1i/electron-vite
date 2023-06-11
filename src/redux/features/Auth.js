import { createSlice } from "@reduxjs/toolkit";

/** @type {{token: string | null, loggedIn: boolean, lastLogin: EpochTimeStamp}} */
const initialState = {
  token: "",
  loggedIn: false,
  lastLogin: -1,
};

const auth = createSlice({
  name: "auth",
  initialState: {
    value: initialState,
  },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
    resetAuth: (state) => {
      state.value = initialState;
    },
  },
});

export const { setAuth, resetAuth } = auth.actions;
export default auth.reducer;