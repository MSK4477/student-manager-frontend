import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const createStudent = async (studentData) => {
  const response = await axios.post(
    `${BASE_URL}/student`,
    studentData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data;
};


 export const getStudents = async () => {
  const response = await axios.get(
    `${BASE_URL}/student`,
    { withCredentials: true }
  );
  return response.data;
};

 export const getStudentById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/student/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

 export const updateStudent = async (id, studentData) => {
  console.log(studentData, "Data")
  const response = await axios.put(
    `${BASE_URL}/student/${id}`,
    studentData,
    { withCredentials: true }
  );
  return response.data;
};

 export const deleteStudent = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/student/${id}`,
    { withCredentials: true }
  );
  return response.data;
};
