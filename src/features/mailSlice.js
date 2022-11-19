import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sendMessageIsOpen: false,
    currentEmailData: null,
}

const mailSlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        setCurrentEmailData: (state, action) => {
            state.currentEmailData = action.payload;
        },
        openSendMessage: state => {
            state.sendMessageIsOpen = true;
        },
        closeSendMessage: state => {
            state.sendMessageIsOpen = false;
        }
    }
});

//exporting actions
export const { setCurrentEmailData, openSendMessage, closeSendMessage } = mailSlice.actions

//exporting selectors
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectCurrentEmailData = state => state.mail.currentEmailData;

//exporting combined reducer
export default mailSlice.reducer