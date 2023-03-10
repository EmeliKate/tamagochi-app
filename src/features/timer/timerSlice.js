import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    timeSaved: 0
}

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setTimeSaved(state, action){
            state.timeSaved = action.payload
        }
    }
})

export const {setTimeSaved} = timerSlice.actions;
export default timerSlice.reducer;