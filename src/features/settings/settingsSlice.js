import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    gameOn: false,
    soundOn: true,
    gameSpeedCoefficient: 60,
    onActiveOnlyModeOn: false,
    modalVisible: true,
    restartVisible: false
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleGame(state){
            state.gameOn = !state.gameOn
        },
        setGameSpeed(state, action) {
            state.gameSpeedCoefficient = action.payload
        },
        toggleSound(state) {
            state.soundOn = !state.soundOn
        },
        toggleActiveMode(state){
            state.onActiveOnlyModeOn = !state.onActiveOnlyModeOn
        },
        toggleShowModal(state){
            state.modalVisible = !state.modalVisible
        },
        toggleRestartVisible(state){
            state.restartVisible = !state.restartVisible
        }
    }
})

export const {setGameSpeed, toggleSound, toggleGame, toggleActiveMode, toggleShowModal, toggleRestartVisible} = settingsSlice.actions;
export default settingsSlice.reducer;