import { useState } from "react";
import { forgotpassword } from "../../service/userService/authService";
import { toast } from "react-toastify";
import Input from "../../components/inputForm";
import inv10 from "../svg/inv10.jpg"
import Loader from "../loader.jsx";
const ForgotPassword = () => {
  const [email, setEmail] = useState({email:""});
  const [load, setLoad] = useState(true)
  const [loader, setLoader] = useState(false)

  const handleChange = (e) => {
const {name, value} = e.target
    setEmail({
      ...email,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const response = await forgotpassword(
        email 
      );
      if (response.message) {
        toast.success(response.message);
        console.log(response);
        setLoad(false)
      }
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err.response.data.error)
    } finally { 
      setLoader(false)
    }
  };

  return (
    <>
{loader &&  <div className="flex justify-center items-center w-full h-screen bg-white"><Loader /> </div> }

      {!loader && load && 
    <div className="w-full p-[5vmax]   gap-6 grid grid-cols-1 max-xl:grid-cols-1 xl:grid-cols-2">

        <>
        <div className="mt-7 rounded-lg shadow-2xl flex items-center justify-center h-screen">
        <form
          className="bg-slate-100  max-md:w-[90%] w-[80%] p-12 rounded-lg shadow-xl"
          onSubmit={handleSubmit} 
        >        
    <h1 className='className="font-bold  text-3xl font-serif text-center'>Forgot Password</h1>
        <br />
        <Input
          type="email"
          name="email"
          required={true}
          value={email.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-96 h-14 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <br />
        <br />
        <button type="submit" className="w-full bg-blue-500 py-3 rounded-lg text-white hover:bg-sky-700">Reset Password</button>
      </form>
      </div>
      <div className="flex max-xl:hidden items-center justify-center bg-white rounded-lg shadow-2xl">
      <img src={inv10} alt="forgot password" />
    </div>
      </>
     
     </div>

     }
    {!load && ( <div className="w-full h-screen flex justify-center items-center ">
    <div className='w-auto py-12 px-10 font-serif rounded-lg shadow-lg font-bold text-3xl'>Email has sent check your mail</div>
    </div>)}

    
    </>
  );
};

export default ForgotPassword;