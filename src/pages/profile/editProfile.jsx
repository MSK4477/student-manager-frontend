import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../service/userService/authService";
import inv6 from "../svg/inv6.png";
const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

   const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setUser(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(user._id, user);
      if (response.message) {
        toast.success("User Updated Successfully");
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className=" w-[calc(100%-16%)] absolute left-48 top-0   h-screen p-[4vmax] max-md:w-full max-md:left-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        <form
          className="col-span-1 relative  justify-center items-center h-auto bg-white m-2 p-8 rounded-lg flex-col flex shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl absolute top-3 font-bold">Update User</h1>
<br />
          <input
            type="text"
            name="name"
            required={true}
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            className=" p-4 border rounded-lg w-3/4 border-gray-300  focus:outline-none focus:border-blue-500"
          />

          <br />
          <br />
          <input
            type="text"
            required={true}
            placeholder="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className=" p-4 border rounded-lg w-3/4 border-gray-300  focus:outline-none focus:border-blue-500"
          />
          <br />
          <br />
          <input
            type="text"
            required={true}
            placeholder="image"
            name="category"
            value={user.image}
            onChange={handleChange}
            className=" p-4 border w-3/4 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <br />
          <br />

          <br />
          <button
            className="bg-blue-500 w-1/2  rounded-lg text-white p-4 hover:bg-sky-700"
            type="submit"
          >
            Update
          </button>
        </form>

        <div className="  justify-center items-center h-fit bg-white m-2 p-8 rounded-lg flex-col flex shadow-2xl">
          <img src={inv6} alt="" />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
