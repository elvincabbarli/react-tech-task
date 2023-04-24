import { createSlice } from "@reduxjs/toolkit";

const getAllUsers = () => {
    const allUsers = window.localStorage.getItem('users');
    if(allUsers) {
        return JSON.parse(allUsers);
    }else{
        return [];
    }
};

const initialUserState = {
    users: getAllUsers(),
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialUserState,
    reducers: {
        addUser(state,action) {
            state.users = [...state.users, action.payload];
        },
    },
});

export const userSliceAction = userSlice.actions;