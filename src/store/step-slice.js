import { createSlice } from "@reduxjs/toolkit";

const getAllCreditData = () => {
    const creditData = window.localStorage.getItem('allCreditData');
    if(creditData) {
        return JSON.parse(creditData);
    }else {
        return []
    }
}

const initialStepState = {
    step: 1,
    finalData: {},
    confirmedCreditData: getAllCreditData(),
};

export const stepSlice = createSlice({
    name: 'stepSlice',
    initialState: initialStepState,
    reducers: {
        changeStep(state,action) {
            state.step = action.payload;
        },
        getUserData(state,action) {
            state.finalData = {...state.finalData, ...action.payload};
        },
        addCreditData(state,action) {
            state.confirmedCreditData = [...state.confirmedCreditData, action.payload];
        },
    },
});

export const stepSliceAction = stepSlice.actions;