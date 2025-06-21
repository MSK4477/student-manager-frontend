import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProduct,
  updateProduct,
} from "../../service/productService/productsService";
import inv7 from "../svg/inv7.jpg";
const EditProduct = () => {
  const initialState = {
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    quantity: "",
  };
  const category = localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : [];
  console.log(category);
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(id, product);
      if (response.message) {
        toast.success("Product Updated Successfully");
        navigate("/products");
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-[7vmax] max-md:w-full max-md:left-0 w-[calc(100%-16%)] absolute left-48 top-0   h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  ">
        <form
          className="col-span-1 space-y-1  justify-center items-center h-fit bg-white m-2 p-8 rounded-lg flex-col flex shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold">Update Product</h1>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required={true}
            value={product.name}
            onChange={handleChange}
            className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <br />
          <textarea
            type="text"
            required={true}
            name="description"
            value={product.description}
            onChange={handleChange}
            className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
                    <br />

          <input
            type="text"
            required={true}
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <br />
          <label className="p-2 text-xl text-gray-700">Category</label>
          <select
            name="category"
            required={true}
            size="1"
            onChange={handleChange}
            value={product.category}
            className="w-3/4 border p-2  bg-white  rounded"
          >
            {category.map((item) => (
              <option key={item} value={item.name}>
                {item}
              </option>
            ))}
          </select>
          <br />

          <input
            type="text"
            placeholder="Image"
            required={true}
            name="image"
            value={product.image}
            onChange={handleChange}
            className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
                    <br />

          <input
            type="text"
            placeholder="Quantity"
            required={true}
            name="quantity"
            className=" p-2 border w-3/4 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={product.quantity}
            onChange={handleChange}
          />{" "}
          <br />
          <button
            className="bg-blue-500 w-1/2 rounded-lg text-white p-2 hover:bg-sky-700"
            type="submit"
          >
            Update
          </button>
        </form>

        <div className="col-span-1  justify-center items-center h-auto bg-white m-2 p-8 rounded-lg flex-col flex shadow-2xl">
          <img src={inv7} alt="" />
        </div>
      </div>
    </>
  );
};
export default EditProduct;
