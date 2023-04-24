import { createSlice } from "@reduxjs/toolkit";

const getAllZamins = () => {
    const allZamins = window.localStorage.getItem('zamins');
    if(allZamins) {
        return JSON.parse(allZamins);
    }else{
        return [];
    }
};

const initialZaminState = {
    zamin: getAllZamins(),
};

export const zaminSlice = createSlice({
    name: 'zaminSlice',
    initialState: initialZaminState,
    reducers: {
        addZamin(state,action) {
            state.zamin = [...state.zamin, action.payload];
        },
        removeZamin(state,action) {
            state.zamin = state.zamin.filter(item => item.finKodz !== action.payload)
        }
    },
});

export const zaminSliceAction = zaminSlice.actions;