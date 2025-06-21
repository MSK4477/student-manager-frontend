import { getUser } from "../../service/userService/authService";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import inv5 from "../svg/inv5.jpg";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [toogle, setToogle] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  const toogleOptions = () => {
    setToogle(!toogle);
  };

  const userCreatedAt = new Date(user.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const userCreatedAtString = userCreatedAt.toLocaleString("en-US", options);

  return (
    <div className=" w-[calc(100%-16%)] absolute left-48 top-0   h-screen p-[5vmax] max-md:w-full max-md:left-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      <div className="col-span-1  justify-center items-between h-auto bg-white m-2 p-9  rounded-lg flex-col flex shadow-2xl">
        <h1 className="text-xl text-yellow-900 flex justify-between items-between font-bold">
          User Profile
         
          <div className="flex relative justify-between items-between  ">
            <i
              onClick={() => toogleOptions(user._id)}
              className="fa-solid absolute right-0 top-0 text-lg p-2 cursor-pointer fa-ellipsis-vertical"
              style={{ color: "#000000" }}
            ></i>{" "}
            <br />
            {toogle && (
              <h1 className="bg-white absolute top-4 right-5  cursor-pointer border p-3 rounded-lg shadow-2xl">
                <Link className="text-black text-sm hover:text-blue-700" to={`/edit-profile/${user._id}`}>Edit</Link>
              </h1>
            )}
          </div>{" "}
        </h1>

        <div className="flex flex-col" key={user.name}>
          <img className="w-3/5 py-8" src={user.image} alt="user-profile" />
          <p className="text-lg font-bold text-orange-500 ">
            <span className="text-gray-700">Name:</span> {user.name}
          </p>
          <p className="text-lg font-bold text-orange-500">
            <span className="text-gray-700">Email:</span> {user.email}
          </p>
          <p className="text-lg font-bold text-orange-500">
            <span className="text-gray-700">Phone:</span> {user.phone}
          </p>
          <p className="text-lg font-bold text-orange-500">
            <span className="text-gray-700">Account Created In:</span>{" "}
            {userCreatedAtString}
          </p>
        </div>
      </div>
      <div className="col-span-1 w-auto justify-center items-center  bg-white m-2  rounded-lg flex-col flex shadow-2xl">
        <img src={inv5} alt="profile" />
      </div>
    </div>
  );
};

export default Profile;
