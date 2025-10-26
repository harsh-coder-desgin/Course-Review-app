import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { data } from "react-router-dom";
// also can add course detail 
const initialState = {
    courses: [],
    edit: null,
    onecourse: null,
}
// all compete edit,add,delete,show data all these things are all done 
// now go to new review and review rount now 
// all other style of moblie Ui view after we re watch this code all 
// now work in New Review
//also add course review of all user below course detail




//modfity store
// modifty course detail when user click on course box then after go to course detail  In the store it not check condtion and not add state.onecourse in store

const courseAuthSlice = createSlice({
    name: "courseAuth",
    initialState,
    reducers: {
        allcourse: (state, action) => {
            state.courses = action.payload
            console.log(action);
        },
        addcourse: (state, action) => {
            // const course = {
            //     // id: nanoid(),
            //     text: action.payload
            // }
            console.log(state.courses);

            state.courses.push(action.payload)
        },
        setEditcourse: (state, action) => {
            console.log(action.payload);
            
            // state.edit = action.payload;
            const course = state.courses.find(
                (course) => course._id === action.payload
            );
            if (course) {
                console.log(course,"aa");
                state.edit = course // overwrite with new input
            }else{
                console.log("error"); 
            }
            
        },
        updatecourse: (state, action) => {
            console.log(action.payload)
            const index = state.courses.findIndex(
                (course) => course._id === action.payload._id
            );
            if (index !== -1) {
                state.courses[index] = action.payload; // overwrite with new input
            }
            state.edit = null
        },
        deletecourse: (state, action) => {
            state.courses = state.courses.filter((course) => course
                ._id !== action.payload)
        },
        detailcourse: (state, action) => {
            // console.log(action.payload);
            state.onecourse = action.payload
            // console.log((state.courses));
            const course = state.courses.find((course) =>
                course._id === action.payload)
            if (course) {
                state.onecourse = course
                // console.log(course);
            }
            //             const snapshot = [...state.courses]; // shallow clone
            // console.log(snapshot);
            //             console.log(state.courses);

            // const course = state.courses.find(
            //     (course) => course._id === action.payload
            // );
            // // console.log(state.courses);

            // if (course) {
            //     state.onecourse = course;
            // } else {
            //     state.onecourse = null; // optional, clear if not found
            // }

            // console.log(state.onecourse);
        }

    }
})

export const { addcourse, setEditcourse, updatecourse, deletecourse, allcourse, detailcourse } = courseAuthSlice.actions;

export default courseAuthSlice.reducer;