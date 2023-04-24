import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user-slice";
import { stepSlice } from "./step-slice";
import { zaminSlice } from "./zamin-slice";

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        stepReducer: stepSlice.reducer,
        zaminReducer: zaminSlice.reducer
    },
});