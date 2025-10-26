import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    searchcreator:null,
    searchcourse:null
}

const usersearchAuthSlice  = createSlice({
    name:"usersearchAuth",
    initialState,
    reducers:{
        usersearchcreator:(state,action)=>{            
            state.searchcreator = action.payload            
        },
        usersearchcourse :(state,action)=>{
            state.searchcourse = action.payload
        }
    }
})

export const {usersearchcreator,usersearchcourse } = usersearchAuthSlice.actions;

export default usersearchAuthSlice.reducer;