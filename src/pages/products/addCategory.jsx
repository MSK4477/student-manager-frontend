import { useState } from "react";
import { toast } from "react-toastify";
import inv2 from "../svg/inv2.jpg";
import inv3 from "../svg/inv3.jpg";
const AddCategory = () => {
  const [category, setCategory] = useState("");

  const addToCat = (e) => {
    e.preventDefault()
    const data = localStorage.getItem("category")
      ? JSON.parse(localStorage.getItem("category"))
      : [];
    // localStorage.removeItem("category")

    const lowercaseCategory = category.toLowerCase();

    for(let oldCategory of data){
      if(oldCategory == lowercaseCategory){
        toast.error("Category Already Exist");
        setTimeout(() => {
         toast.info("Please Add New Category");
        },2000)
        return;
      }
       
      }
    
      const newData = [...data, lowercaseCategory];

      localStorage.setItem("category", JSON.stringify(newData));
      toast.success(`Added The Category ${lowercaseCategory} To Our List Successfully`);
      setCategory("");
    
  };
  return (
    <div className="p-[7vmax] max-md:w-full max-md:left-0 w-[calc(100%-16%)] absolute left-48 top-0   h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 ">

      {" "}
      <div className="bg-white col-span-1  rounded-lg shadow-2xl flex flex-col p-10">
      <img className="w-2/3"  src={inv2} alt="img2" />
<br />
<br /><br />
        <h1 className="text-lg font-bold">Add Category</h1>
        <form onSubmit={addToCat}>
        <input
          className=" w-full py-3 px-3 border-collapse text-lg mt-2 text-blue-950 border rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          name="category"
          placeholder="Electronics Furniture Grocery etc.."
          value={category}
          required={true}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 w-28 rounded"
        >
          + Add
        </button>{" "}
        </form>
      </div>
      <div className="bg-white col-span-1  rounded-lg shadow-2xl flex flex-col p-10">

         <img src={inv3} alt="img2" />
      </div>
    </div>
  );
};
export default AddCategory;
