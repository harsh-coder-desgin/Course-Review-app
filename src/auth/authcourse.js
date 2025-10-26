import axios from "axios"

const API = "/api/crouses";

const Course = {

    addcourse: async (data) => {
        console.log(data);
        
        try {
            const formData = new FormData();
            formData.append("courseimage", data.courseimage[0]);
            formData.append("coursetitle", data.coursetitle);
            formData.append("coursetype", data.coursetype);
            formData.append("courselength", data.courselength);
            formData.append("description", data.description);
            formData.append("yturl", data.yturl);
            formData.append("whatlearnformcourse", data.whatlearnformcourse);
            formData.append("tags", data.tags);
            formData.append("price", data.price || 0);
            formData.append("discount", data.discount || 0);
            formData.append("discountPrice", data.discountPrice || 0);

            const res = await axios.post(`${API}/addcourse`, formData, {
                withCredentials: true,
            });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    updatecourse: async (data, courseId) => {
        console.log(data);
        
        try {
            const res =  await axios.patch(`${API}/updatecourse/${courseId}`, data, { withCredentials: true, });
            console.log(res);
            return res
            
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    updatecourseimage: async (data, courseId) => {
        try {
            const formData = new FormData();
            formData.append("courseimage", data);

            const res = await axios.patch(`${API}/updatecourseimage/${courseId}`, formData, { withCredentials: true, })
            console.log(res);
            
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    allcourses: async () => {
        try {
            return await axios.get(`${API}/allcourses`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcourse: async (courseId) => {
        try {
            return await axios.get(`${API}/getcourse/${courseId}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    dashboardcreator: async () => {
        try {
            return await axios.get(`${API}/dashboardcreator`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    deletecourse: async (courseId) => {
        try {
            // it should get or delete
            return await axios.get(`${API}/deletecourse/${courseId}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getlatestreview: async (data) => {
        try {
            return await axios.post(`${API}/getlatestreview`, data,{ withCredentials: true, })
        } catch (error) {
            // console.log(error);
            throw error
        }
    },

    getlateststarreview: async (data) => {
        try {
            return await axios.post(`${API}/getlateststarreview`, data,{ withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcoursereview: async (courseId) => {
        try {
            return await axios.get(`${API}/getcoursereview/${courseId}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getstarbycourserview: async (data, courseId) => {
        try {
            return await axios.post(`${API}/getstarbycourserview/${courseId}`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    creatorreply: async (data) => {
        try {
            return await axios.post(`${API}/creatorreply`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    coursebytags:async (data) =>{
        console.log(data,"tags search ");
        
        try {
            return await axios.post(`${API}/coursebytags`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    creatorreplyedit: async (data) => {
        console.log(data);
        
        try {
            return await axios.patch(`${API}/creatorreplyedit`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    creatoreplydelete: async (data) => {
        try {
            return await axios.patch(`${API}/creatorreplydelete`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deletereplymodify: async (data) => {
        try {
            return await axios.post(`${API}/deletereplymodify`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    reportcreatorreplycomment: async (data) => {
        try {
            return await axios.post(`${API}/reportcreatorreplycomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    creatorreportcomment: async (data) => {
        try {
            return await axios.post(`${API}/creatorreportcomment`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    avreageratingdata: async (data) => {
        try {
            return await axios.post(`${API}/avreageratingdata`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    }

};
export default Course;
