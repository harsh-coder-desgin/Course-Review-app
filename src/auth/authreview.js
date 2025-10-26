import axios from "axios"

const API = "/api/review";

const Review = {

    userwritereview: async (data) => {
        try {
            return await axios.post(`${API}/userwritereview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    likereview: async (data) => {
        try {
            return await axios.post(`${API}/likereview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    removelike: async (data) => {
        try {
            return await axios.post(`${API}/removelike`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    upvotereview: async (data) => {
        try {
            return await axios.post(`${API}/upvotereview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    removeupvotereview: async (data) => {
        try {
            return await axios.post(`${API}/removeupvotereview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    downvotesreview: async (data) => {
        try {
            return await axios.post(`${API}/downvotesreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    removedownvotesreview: async (data) => {
        try {
            return await axios.post(`${API}/removedownvotesreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    writecommentreview: async (data) => {
        try {
            return await axios.post(`${API}/writecommentreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    editcommentreview: async (data) => {
        try {
            return await axios.patch(`${API}/editcommentreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    likeusercomment: async (data) => {
        try {
            return await axios.post(`${API}/likeusercomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    removelikeusercomment: async (data) => {
        try {
            return await axios.post(`${API}/removelikeusercomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    reportusercomment: async (data) => {
        try {
            return await axios.post(`${API}/reportusercomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    autodeletereportcomment: async (data) => {
        try {
            return await axios.post(`${API}/autodeletereportcomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    userdeletecomment: async (data) => {
        try {
            return await axios.post(`${API}/userdeletecomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    //reply

    replycommentreview: async (data) => {
        try {
            return await axios.post(`${API}/replycommentreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    editreplycommentreview: async (data) => {
        try {
            return await axios.post(`${API}/editreplycommentreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    replylikereview: async (data) => {
        try {
            return await axios.post(`${API}/replylikereview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    removelikreplyreview: async (data) => {
        try {
            return await axios.post(`${API}/removelikreplyreview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    reportreply: async (data) => {
        try {
            return await axios.post(`${API}/reportreply`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    autoreportreply: async (data) => {
        try {
            return await axios.post(`${API}/autoreportreply`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    deletereplycomment: async (data) => {
        try {
            return await axios.post(`${API}/deletereplycomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //course-review print

    getcoursereview: async (courseid) => {
        try {
            return await axios.get(`${API}/getcoursereview${courseid}`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcommentofreview: async (data) => {
        console.log(data);
        
        try {
            return await axios.post(`${API}/getcommentofreview`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getallreplycomment: async (data) => {
        console.log(data);
        
        try {
            return await axios.post(`${API}/getallreplycomment`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getallreply: async (data) => {
        try {
            return await axios.post(`${API}/getallreply`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getuserrating: async (data, courseid) => {
        try {
            return await axios.post(`${API}/getuserrating${courseid}`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcreatorreview: async (data, creatorid) => {
        try {
            return await axios.get(`${API}/getcreatorreview/${creatorid}`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getratingcreator: async (data, creatorid) => {
        try {
            return await axios.post(`${API}/getratingcreator/${creatorid}`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getlatestrreview: async () => {
        try {
            return await axios.get(`${API}/getlatestrreview`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    deletereplycomment: async (data) => {
        try {
            return await axios.post(`${API}/deletereplycomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    deletereplycomment: async (data) => {
        try {
            return await axios.post(`${API}/deletereplycomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    
};
export default Review;
