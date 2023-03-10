import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    maxNeedValue: 100,
    sleepNeed: 100,
    feedNeed: 100,
    socialNeed: 100,
    isSleeping: false,
    sleepingIncrement: 0.1667,
    feedingIncrement: 0.3334,
    socialIncrement: 0.3334,
    sleepAddIncrement: 1
}

const needsSlice = createSlice({
    name: "needs",
    initialState,
    reducers: {
        changeSleep(state, action){
            state.sleepNeed = state.sleepNeed + action.payload
        },
        setSleep(state, action){
            state.sleepNeed = action.payload
        },
        changeFeed(state, action){
            state.feedNeed = state.feedNeed + action.payload
        },
        setFeed(state, action){
            state.feedNeed = action.payload
        },
        changeSocial(state, action){
            state.socialNeed = state.socialNeed + action.payload
        },
        setSocial(state, action){
            state.socialNeed = action.payload
        },
        toggleSleep(state){
            state.isSleeping = !state.isSleeping
        }
    }
})

export const {changeSleep, changeFeed, changeSocial, toggleSleep, setSocial, setSleep, setFeed} = needsSlice.actions;
export default needsSlice.reducer;