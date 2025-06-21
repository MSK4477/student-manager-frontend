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
import Side from "./pages/side.jsx";
import AddProduct from "./pages/products/addProduct";
import AddCategory from "./pages/products/addCategory";
import Getproducts from "./pages/products/getProducts";
import EditProduct from "./pages/products/editProduct";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/editProfile";
import Dashboard from "./pages/dashboard/dashboard";
import userContext from "./userContext/userContext.js";
import useUser from "./hooks/userHook";
const App = () => {
  const [user, loading] = useUser();
  return (
    <>
      <userContext.Provider value={{ user, loading }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/edit-profile/:id"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar />
                    <Side />
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
                    <Sidebar /> <Side /> <Profile />
                  </>
                }
              />
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar /> <Side /> <EditProduct />
                  </>
                }
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar /> <Side /> <Getproducts />{" "}
                  </>
                }
              />
            }
          />
          <Route
            path="/add-category"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar /> <Side /> <AddCategory />{" "}
                  </>
                }
              />
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar /> <Side />
                    <AddProduct />{" "}
                  </>
                }
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedPage
                element={
                  <>
                    <Sidebar /> <Side />
                    <Dashboard />{" "}
                  </>
                }
              />
            }
          />
        </Routes>
      </userContext.Provider>
    </>
  );
};

export default App;
