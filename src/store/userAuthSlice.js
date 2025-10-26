import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status:false,
    users:null
}

const userAuthSlice  = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        userLogin:(state,action)=>{            
            state.status=true;
            state.users = action.payload            
        },
        userLogout :(state)=>{
            state.status = false;
            state.users = null;
        }
    }
})

export const {userLogin,userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;