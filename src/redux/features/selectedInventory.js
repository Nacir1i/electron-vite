import {  createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectedInventory = createSlice({
    name: "seletecInventory",
    initialState: {
        value: initialState
    },
    reducers: {
        setSelectedInventory: (state, action) => {
            state.value = action.payload;
        },
        resetSelectedInventory: (state) => {
            state.value = initialState;
        }
    }
})

export const { setSelectedInventory, resetSelectedInventory } = selectedInventory.actions;
export default selectedInventory.reducer;
