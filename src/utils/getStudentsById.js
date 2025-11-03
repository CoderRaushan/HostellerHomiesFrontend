import axios from 'axios';

const getStudentsById = async (id) => {
    try {
        const mainUri = import.meta.env.VITE_MAIN_URI;
     
        const response = await axios.get(`${mainUri}/api/student/getStudentsById/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching student by ID:", error);
        throw error; // Optional: rethrow if you want to handle this further up
    }
};

export default getStudentsById;
