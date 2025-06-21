import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { resetpassword } from "../../service/userService/authService";
import { toast } from "react-toastify";
import Input from "../../components/inputForm";
import Button from "../../components/button";
// import Label from "../../components/label";
import inv11 from "../svg/inv11.png"
import Loader from "../loader.jsx";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [queryParam] = useSearchParams();
  const [loader, setLoader] = useState(false)

  const token = queryParam.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const { newPassword, confirmNewPassword} = formData
  const handleSubmit = async(e) => {
    setLoader(true)
    e.preventDefault();
if(newPassword.length && confirmNewPassword.length < 8){
toast.error("Password must be 8 characters long")
return;
}
if(newPassword !== formData.confirmNewPassword){
toast.error("New Password and Confirm Password doesn't match")
return;
}
    try {
      const response = await resetpassword(token, formData);
      
      console.log(response);
      toast.success(response.message);
      navigate("/login");
    } catch (err) {
        console.log(err.response.data.error)
      toast.error(err.response.data.error);
    } finally { 
      setLoader(false)
    }
  };

  return (
    <>
   {!loader  ? <div className="w-full p-[5vmax]   gap-6 grid grid-cols-1 max-xl:grid-cols-1 xl:grid-cols-2">

<div className="  mt-7 rounded-lg shadow-2xl flex items-center justify-center h-screen">

<form className="bg-slate-100 max-md:w-[90%] p-10 rounded-lg shadow-xl" onSubmit={handleSubmit}>

      <h1 className="text-3xl font-serif text-center">Reset Password</h1>
<br /><br />
       
        <br />
        {/* <Label htmlFor="password" text="New Password" /> */}
        <Input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          placeholder="New Password"
          onChange={handleChange}
          min={8}
          required={true}

        /> <br />
        {/* <Label htmlFor="password" text="Confirm Password" /> */}
        <Input
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          placeholder="Confirm New Password"
          onChange={handleChange}
          min={8}
          required={true}

        /> <br />
       
       
        <Button type="submit" text="Set Password" />
      </form>
    </div>
    <div className=" bg-white max-xl:hidden  rounded-lg shadow-2xl">
<img src={inv11}  alt="" />
</div>
    </div> : <div className="flex justify-center items-center w-full h-screen bg-white"><Loader /> </div>}
    </>
  );
};
export default ResetPassword;
