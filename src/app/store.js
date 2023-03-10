import {configureStore } from "@reduxjs/toolkit";
import settingsSlice from "../features/settings/settingsSlice";
import needsSlice from "../features/needs/needsSlice";
import timerSlice from "../features/timer/timerSlice";

export const store = configureStore({
    reducer: {
        settings: settingsSlice,
        needs: needsSlice,
        timer: timerSlice
    }
})

