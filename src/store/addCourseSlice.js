import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    coursedata:[],
    tab:null,
 }

const addcourseAuthSlice  = createSlice({
    name:"addcourseAuth",
    initialState,
    reducers:{
        addcoursedata:(state,action)=>{
            console.log(action.payload);
            // console.log(action.payload.data2.description);
            // console.log(action.payload.data2.courseimage[0]);
            
            // if (action?.payload?.data1 && action?.payload?.data2) {
                // state.coursedata = {...action.payload?.data1}
                // state.coursedata = {...action.payload?.data2.description}
                // state.coursedata.push(action.payload)


            // }else{
            //     console.log("err");
                
                state.coursedata = {...action.payload}


            // }

            // const jsonString = JSON.stringify(action.payload);
            // localStorage.setItem("courseData", jsonString);  
            console.log(state.coursedata);
             
        },
        changetab:(state,action)=>{
            state.tab= action.payload
        }
    }
})

export const {addcoursedata,changetab} = addcourseAuthSlice.actions;

export default addcourseAuthSlice.reducer;