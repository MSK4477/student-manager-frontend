import { toast } from "react-toastify";
import { createProducts } from "../../service/productService/productsService";
import { useState } from "react";
import "./product.css";
import inv1 from "../svg/inv1.jpg";

const AddProduct = () => {
  const category = localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : [];

  const initialState = {
    productID: "",
    name: "",
    description: "",
    price: "",
    category: category.length === 1 ? category[0] : "",
    quantity: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);

  if (category.length === 0) {
    category[0] = "Add Category";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProducts(formData);
      if (response.message) {
        toast.success("Product Created Successfully");
        setFormData(initialState);
      }
    } catch (err) {
      console.log(err.response.data.error);
      if (err.response.data.error === "Product Already Exist") {
        toast.error("Product ID has Already Exist");
      } else if (err.response.data) {
        toast.error(err.response.data.error);
      }
    }
  };

  return (
    <>
      <div className=" p-[7vmax] max-md:w-full max-md:left-0 w-[calc(100%-16%)] absolute left-48 top-0   h-full   grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 ">
       
        <div className=" bg-white  p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="text"
              required={true}
              name="productID"
              placeholder="Enter Product ID"
              value={formData.productID}
              onChange={handleChange}
              className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <br />

            <input
              type="text"
              required={true}
              placeholder="Enter Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />            <br />


            <textarea
              name="description"
              required={true}
              minLength={25}
              value={formData.description}
              placeholder="Enter Product Description"
              onChange={handleChange}
              className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <br />

            <input
              type="text"
              required={true}
              name="price"
              value={formData.price}
              placeholder="Enter Product Price"
              onChange={handleChange}
              className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <br />

            <input
              type="text"
              name="quantity"
              required={true}
              placeholder="Enter Product Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <br />

            <label className="block text-left relative left-16 text-lg font-medium text-gray-600">
              Category
            </label>
            <select
              name="category"
              id="category"
              required={true}
              size="1"
              value={formData.category}
              className="w-3/4 border p-1  bg-white  rounded"
              onChange={handleChange}
            >
              {category.map((item, i) => (
                <option className="bg-white" key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <br />
            <br />

            <input
              type="text"
              required={true}
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter Product Image URL"
              className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <br />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              + Add
            </button>
          </form>
        </div>
        <div className=" h-screen bg-white m-2 p-8 rounded-lg shadow-2xl">
          <img src={inv1} alt="add" />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
