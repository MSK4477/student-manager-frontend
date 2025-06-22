import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./student.css";
import { createStudent, getStudentById, updateStudent } from "../../service/studentService/studentService";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "../loader";

const CreateStudent = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const id = location?.state?.id || 0;

  const defaultInitialValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    department: "",
    year: "",
    skills: [],
    profileImage: null,
  };
  const [loader, setLoader] = useState(id)
  const [formInitialValues, setFormInitialValues] = useState(defaultInitialValues);
  const [preview, setPreview] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string(),
    address: Yup.string(),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    department: Yup.string().required("Department is required"),
    year: Yup.string().required("Year of Study is required"),
    skills: Yup.array().min(1, "Select at least one skill"),
    profileImage: Yup.mixed().required("Profile image is required"),
  });

  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Data Science",
  ];
  const years = ["First Year", "Second Year", "Third Year", "Final Year"];
  const skillsList = ["JavaScript", "Python", "C++", "HTML/CSS", "Java"];

  const handleSubmit = async (values, {resetForm}) => {
    const formData = new FormData();

    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("dob", values.dob);
    formData.append("gender", values.gender);
    formData.append("department", values.department);
    formData.append("year", values.year);
    values.skills.forEach((skill) => formData.append("skills[]", skill));
    formData.append("profileImage", values?.profileImage);

    const res = await (id ? updateStudent(id, formData) : createStudent(formData));
    if(res.success) {
     resetForm()
     setPreview("");
     if (fileInputRef.current) {
              fileInputRef.current.value = null;  
            }
     if(id){
      navigate("/students")
     }
    }
    toast.success(`Student ${id ? "updated" : "created"} successfully!`);
  };
 
  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
          try {
          const res = await getStudentById(id);
          const formattedDob = res.data.dob?.split("T")[0] || "";
          setFormInitialValues({
            ...res?.data,
            dob: formattedDob,
          });

          formRef.current?.setValues({
            ...res?.data,
            dob: formattedDob,
          });
        } catch (err) {
          console.error("Failed to fetch student:", err);
        }finally{
          setLoader(false)
        }
      };

      fetchStudent();
    }
  }, [id]);
console.log(loader, "loader")
  return (
    <>
    
     <div className="p-[5vmax] max-md:w-full w-[calc(100%-16%)] absolute left-48 top-0 h-auto grid grid-cols-1">
      {loader ? <div className="flex justify-center items-center h-screen">
  <Loader />
</div> : 
<div className="bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">{`${!id ? "Create" : "Update"} Student`}</h2>

        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="flex flex-col items-center">
                <Field type="text" name="fullName" placeholder="Full Name" className="p-2 border w-3/4 rounded" />
                <ErrorMessage name="fullName" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <Field type="email" name="email" placeholder="Email Address" className="p-2 border w-3/4 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <Field type="text" name="phone" placeholder="Phone Number (optional)" className="p-2 border w-3/4 rounded" />
                <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <Field as="textarea" name="address" placeholder="Address (optional)" className="p-2 border w-3/4 rounded" />
                <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-left w-3/4">Date of Birth</label>
                <Field type="date" name="dob" className="p-2 border w-3/4 rounded" />
                <ErrorMessage name="dob" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-left w-3/4">Gender</label>
                <div className="flex gap-6 w-3/4 justify-start">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g}>
                      <Field type="radio" name="gender" value={g} />
                      &nbsp;{g}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-left w-3/4">Department</label>
                <Field as="select" name="department" className="p-2 border w-3/4 rounded">
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </Field>
                <ErrorMessage name="department" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-left w-3/4">Year of Study</label>
                <Field as="select" name="year" className="p-2 border w-3/4 rounded">
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Field>
                <ErrorMessage name="year" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-left w-3/4">Skills</label>
                <div className="grid grid-cols-2 w-3/4 gap-2 text-left">
                  {skillsList.map((skill) => (
                    <label key={skill} className="flex items-center gap-2">
                      <Field type="checkbox" name="skills" value={skill} />
                      {skill}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="skills" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-left w-3/4">Profile Photo</label>
                <input
                  ref={fileInputRef}
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("profileImage", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="p-2 border w-3/4 rounded bg-white"
                />
                <ErrorMessage name="profileImage" component="div" className="text-red-600 text-sm mt-1" />

                {values.profileImage && typeof values.profileImage === "object" && values.profileImage.originalname && (
                    <p className="text-sm text-gray-600">
                      Current File: {values.profileImage.originalname}
                    </p>
                  )}

                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded border mt-2"
                  />
                  )}
              </div>

              <div className="text-center">
                <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded">
                  + {`${!id ? "Create" : "Update"} Student`}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
}
      
    </div>
    </>
   
  );
};

export default CreateStudent;
