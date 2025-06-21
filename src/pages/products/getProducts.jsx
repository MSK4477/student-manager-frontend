import { useState, useEffect } from "react";
import {
  GetProducts,
  deleteProduct,
} from "../../service/productService/productsService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import inv4 from "../svg/inv4.jpg";

const Getproducts = () => {
  const [product, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showProducts, setShowProducts] = useState(true);

  const toogleOptions = (id) => {
    if (id == selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const removeItem = async (id) => {
    try {
      setShowProducts(true);
      const response = await deleteProduct(id);
      if (response) {
        // window.location.reload()
        const updatedProducts = await GetProducts();
        setProducts(updatedProducts);
        toast.success("Product Deleted Successfully");
      }
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  };
  setTimeout(() => {
    if (product?.pr[0] !== undefined) {
      setShowProducts(true);
    } else {
      setShowProducts(false);
    }
  },2000);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await GetProducts();
        setProducts(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [showProducts]);

 

  return (
    <>
      {showProducts ? (
        <div className="  max-md:w-full max-md:left-0 w-[calc(100%-16%)] absolute left-48 top-0 p-[7vmax]  h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
          {product?.pr?.map((product) => (
            <div
              className="col-span-1 relative h-auto bg-white m-2 mb-5 p-8 rounded-lg shadow-2xl"
              key={product.name}
            >
              <div className="relative">
              <i
                onClick={() => toogleOptions(product.productID)}
                className="fa-solid p-2 absolute right-0 top-0 cursor-pointer fa-ellipsis-vertical"
                style={{ color: "#000000" }}
              ></i>
              </div>
              {selectedId == product.productID && (
                <div className="relative">
                <div className="flex flex-col absolute right-0 top-4 bg-white rounded-lg shadow-2xl py-6 px-6">
                  <p className="text-black font-normal hover:text-blue-600 cursor-pointer">
                    <Link to={`/edit-product/${product.productID}`}>Edit</Link>
                  </p>{" "}
                  <br />
                  <p
                    onClick={() => removeItem(product.productID)}
                    className="text-black font-normal hover:text-blue-600 cursor-pointer"
                  >
                    Delete
                  </p>
                </div>
                </div>
              )}
              <img
                className="object-contain  w-40"
                src={product.image}
                alt=""
              />
              <h1 className="text-orange-500">
                <span className="text-gray-700">Product Name: </span>
                {product.name}
              </h1>
              <br />
              <h1 className="text-orange-500">
                <span className="text-gray-700">Description:</span>
                {product.description}
              </h1>
              <br />
              <h1 className="text-orange-500">
                <span className="text-gray-700">Prcie: </span>₹{product.price}
              </h1>
              <br />
              <h1 className="text-orange-500">
                <span className="text-gray-700">Quantity:</span> &nbsp;
                {product.quantity}
              </h1>
              <br />
              <h1 className="text-orange-500">
                <span className="text-gray-700">Category: </span>
                {product.category}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <div className="  max-md:w-full max-md:left-0  w-[calc(100%-16%)] absolute left-48 top-0 p-9  h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
          <div className="col-span-1  justify-center items-center h-fit bg-white m-2 p-8 rounded-lg flex-col flex shadow-2xl">
            <h1 className="text-xl font-bold">
              Your Inventory is Empty Please <Link className="text-blue-700"  to={"/add-product"}>Add</Link> Products To View
            </h1>
            <img className="w-3/5" src={inv4} alt="empty shop" />
          </div>
        </div>
      )}
    </>
  );
};
export default Getproducts;
