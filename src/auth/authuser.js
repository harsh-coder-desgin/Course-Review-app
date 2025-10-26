import axios from "axios"

const API = "/api/users";

const User = {

    register: async (data) => {
        try {
            return await axios.post(`${API}/register`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    login: async (data) => {
        try {
            const res = await axios.post(`${API}/login`, data, {
                withCredentials: true,
            });
            return res;
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    emailverfication: async (data) => {
        try {
            return await axios.post(`${API}/emailverfication`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    newotp: async (data) => {
        try {
            return await axios.post(`${API}/newotp`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    logout: async (data) => {
        try {
            return await axios.post(`${API}/logout`, data, { withCredentials: true, })
        } catch (error) {
            throw error
        }
    },

    searchcreatorname: async (data) => {
        try {
            return await axios.post(`${API}/searchcreatorname`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    searchcoursename: async (data) => {
        try {
            return await axios.post(`${API}/searchcoursename`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    latestcourse: async () => {
        try {
            return await axios.get(`${API}/latestcourse`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },


    showallcreator: async () => {
        try {
            return await axios.get(`${API}/showallcreator`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },


    paidcourse: async () => {
        try {
            return await axios.get(`${API}/paidcourse`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },


    freecourse: async () => {
        try {
            return await axios.get(`${API}/freecourse`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcoursefree: async (courseId) => {
        try {
            return await axios.get(`${API}/getcoursefree/${courseId}`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcoursepaid: async (courseId) => {
        try {
            return await axios.get(`${API}/getcoursepaid/${courseId}`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcreatorprofile: async (courseId) => {
        try {
            return await axios.get(`${API}/getcreatorprofile/${courseId}`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    topratedcourse: async () => {
        try {
            return await axios.get(`${API}/topratedcourse`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },


    getusernotification: async () => {
        try {
            return await axios.get(`${API}/getusernotification`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    followcreator: async (creatorid) => {
        try {
            return await axios.get(`${API}/followcreator/${creatorid}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    unfollowcreator: async (creatorid) => {
        try {
            return await axios.get(`${API}/unfollowcreator/${creatorid}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getuser: async () => {
        try {
            return await axios.get(`${API}/getuser`, { withCredentials: true, })
        } catch (error) {
            throw error
        }
    },
    refreshtoken: async () => {
        try {
            return await axios.post(`${API}/refreshtoken`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    verfiyauthuser: async () => {
        try {
            return await axios.get(`${API}/verfiyauthuser`, { withCredentials: true, })
        } catch (error) {
            throw error
        }
    },

    topratedserachbytag: async (data) => {
        try {
            return await axios.post(`${API}/topratedserachbytag`, data)
        } catch (error) {
            throw error
        }
    },

    allfindcoursebytags: async (data) => {
        try {
            return await axios.post(`${API}/allfindcoursebytags`, data)
        } catch (error) {
            throw error
        }
    },

    searchsuggestion: async (data) => {
        try {
            return await axios.post(`${API}/searchsuggestion`, data)
        } catch (error) {
            throw error
        }
    },

    serachcoursesuggestion: async (data) => {
        try {
            return await axios.post(`${API}/serachcoursesuggestion`, data)
        } catch (error) {
            throw error
        }
    }


};
export default User;
