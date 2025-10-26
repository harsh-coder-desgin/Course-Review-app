import { configureStore } from "@reduxjs/toolkit";
import creatorAuthReducer  from "./creatorAuthSlice"; // Don't include `.js` if using module bundler like Vite or Webpack
import userAuthReducer from "./userAuthSlice"
import courseAuthReducer from "./courseAuthSlice"
import usernotificationAuthReducer from "./usernotificationSlice"
import creatorcommentAuthReducer from "./creatorComment"
import usersearchAuthReducer from "./usersearch"
import addcourseAuthReducer from './addCourseSlice'
const store = configureStore({
  reducer: {
    creatorAuth: creatorAuthReducer,
    userAuth:userAuthReducer,
    courseAuth:courseAuthReducer,
    usernotificationAuth:usernotificationAuthReducer,
    creatorcommentAuth:creatorcommentAuthReducer,
    usersearchAuth:usersearchAuthReducer,
    addcourseAuth:addcourseAuthReducer
  },
});

export default store;
