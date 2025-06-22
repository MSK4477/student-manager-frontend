// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { toast } from "react-toastify";
import Welcome from "./pages/welcome";
import ProtectedPage from "./pages/protected";
import Login from "./pages/userAuth/login";
import Register from "./pages/userAuth/register";
import ForgotPassword from "./pages/userAuth/forgotPassword";
import ResetPassword from "./pages/userAuth/resetPassword";
import Verify from "./pages/userAuth/verify";
import Sidebar from "./pages/sideBar";
import CreateStudent from "./pages/students/addStudent.jsx";

import StudentList from "./pages/students/StudentList.jsx";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/editProfile";
const App = () => {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/edit-profile/:id"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar />
                    <EditProfile />{" "}
                  </>
                }
              />
            }
          />
          <Route path="/" element={<ProtectedPage element={<Welcome />} />} />
          <Route
            path="/profile"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar />   <Profile />
                  </>
                }
              />
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar />  <StudentList />{" "}
                  </>
                }
              />
            }
          />
          <Route
            path="/add-student"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar /> 
                    <CreateStudent />{" "}
                  </>
                }
              />
            }
          />
        </Routes>
    </>
  );
};

export default App;
