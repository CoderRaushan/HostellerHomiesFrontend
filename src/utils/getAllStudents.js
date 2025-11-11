const getAllStudents = async () => {
    const mainUri = import.meta.env.VITE_MAIN_URI;
    const token = localStorage.getItem("token");
    const result = await fetch(`${mainUri}/api/student/get-all-students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: "1" }),
    });
    const data = await result.json();
    return data;
};

export default getAllStudents;