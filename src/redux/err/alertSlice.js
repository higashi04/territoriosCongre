import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    message: '',
    type: ''
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            console.log('show alert:', action.payload);
            const {message, type} = action.payload;
            state.show = true;
            state.message = message;
            state.type = type;
        },
        hideAlert: state => {
            state.show = false;
            state.message = '';
            state.type = '';
        }
    }
});

export const {showAlert, hideAlert} = alertSlice.actions;
export default alertSlice.reducer;