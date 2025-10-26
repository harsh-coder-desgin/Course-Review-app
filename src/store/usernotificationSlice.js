import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   notification:[]
}

const usernotificationAuthSlice = createSlice({
    name: "usernotificationAuth",
    initialState,
    reducers: {
        usernotification: (state, action) => {
            state.notification.push(action.payload)
        },
    }
})

export const { usernotification } = usernotificationAuthSlice.actions;

export default usernotificationAuthSlice.reducer;