import { createSlice, nanoid } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit';

const initialState = {
    comment: null,
    reply: [],
    nestedreplys: [],
    // Writereply: //add todo in comment,reply,Nestedreply
    //editwritereply //edit todo in comment,reply,Nestedreply
    //deletereply //delete todo in comment,reply,Nestedreply
    edit: null,
}

const courseAuthSlice = createSlice({
    name: "creatorcommentAuth",
    initialState,
    reducers: {
        allcomment: (state, action) => {
            state.comment = action.payload
            console.log(action.payload);
        },
        allreply: (state, action) => {
            state.reply = action.payload
            console.log(action);
        },
        allnestedreplys: (state, action) => {
            state.nestedreplys = action.payload
            console.log(action);
        },

        addreply: (state, action) => {
            state.reply.push(action.payload);
        },

        addnestedreplys: (state, action) => {
            // const { parentReplyId, newReply } = action.payload;
            let parentReplyId = action.payload.parentReplyId
            function addReplyRecursively(replies) {
                return replies.map(reply => {
                    if (reply._id === parentReplyId) {
                        // Return a NEW reply object with updated children
                        return {
                            ...reply,
                            children: [...(reply.children || []), action.payload],
                        };
                    }
                    if (reply.children && reply.children.length > 0) {
                        return {
                            ...reply,
                            children: addReplyRecursively(reply.children),
                        };
                    }
                    return reply;
                });
            }

            state.nestedreplys = addReplyRecursively(state.nestedreplys);
        },


        Editreply: (state, action) => {
            console.log(action.payload);
            const data = state.reply.findIndex(
                (replys) => replys._id === action.payload._id
            );
            // console.log(data);

            if (data !== -1) {
                state.reply[data] = action.payload; // overwrite with new input
            }

        },
        Editnestedreplys: (state, action) => {
            console.log(action.payload)
            // const data = state.reply.findIndex(
            //     (replys) => replys._id === action.payload._id
            // );
            function overwriteReplyImmutable(replyList) {
                return replyList.map(reply => {
                    if (reply._id === action.payload._id) {
                        return action.payload; // Replace this reply
                    }
                    if (reply.children && reply.children.length > 0) {
                        return {
                            ...reply,
                            children: overwriteReplyImmutable(reply.children),
                        };
                    }
                    return reply;
                });
            }

            state.nestedreplys = overwriteReplyImmutable(state.nestedreplys);



            // if (index !== -1) {
            //     state.courses[index] = action.payload; // overwrite with new input
            // }
            // state.edit = null
        },
        deletereply: (state, action) => {
            const data = state.reply.find(
                (replys) => replys._id === action.payload
            );
            if (data) {
                data.isDeleted = true
            }
        },
        deletenestedreplys: (state, action) => {
            console.log(action.payload);
            
            function overwriteReplyImmutable(replyList) {
                return replyList.map(reply => {
                    if (reply._id === action.payload) {
                          return { ...reply, isDeleted: true };                   
                     }
                    if (reply.children && reply.children.length > 0) {
                        return {
                            ...reply,
                            children: overwriteReplyImmutable(reply.children),
                        };
                    }
                    return reply;
                });
            }

            state.nestedreplys = overwriteReplyImmutable(state.nestedreplys);      
          },
            addchildrenreply: (state, action) => {
                console.log(action.payload);
                
            const data = state.reply.find(
                (replys) => replys._id === action.payload
            );
            if (data) {
                data.children += 1
            }
        },

    }
})

export const { allcomment, allreply, allnestedreplys, deletecourse, allcourse, detailcourse, addreply, addnestedreplys, Editreply, Editnestedreplys ,deletereply,deletenestedreplys,addchildrenreply} = courseAuthSlice.actions;

export default courseAuthSlice.reducer;