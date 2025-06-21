import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'; 
import { useSearchParams, Link } from 'react-router-dom';
import { verify } from '../../service/userService/authService';
import Loader from "../loader.jsx";

const Verify = () => {

    const[ queryParams ] = useSearchParams();
    const [load, setLoad] = useState(true)
    const token = queryParams.get('token');
    const [loader, setLoader] = useState(false)

const verifyUser = async () => {
setLoader(true)
    try{
        
        const res = await verify(token)
        if (res){
            console.log(res)
            toast.success(res.message)
            setLoad(true)
            return;
        }
console.log(res)
    }catch(err){
        console.log(err)
    } finally { 
        setLoader(false)
    }

}

useEffect(() => { 
    verifyUser()
}, [])

return(
    <>
    {!loader &&(<div className='   flex justify-center h-screen items-center'> 
      <h1 className='w-auto py-12 px-10 font-serif rounded-lg shadow-lg font-bold text-3xl'>
        Email Verified go to <Link className=" font-serif text-blue-500 hover:text-sky-700" to={"/login"}>Login</Link> Page  </h1>  
        </div>)} { loader &&
            <div className="flex justify-center items-center w-full h-screen bg-white"><Loader /> </div>        }
        </>
)

}

export default Verify