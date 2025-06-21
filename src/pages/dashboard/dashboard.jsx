import { GetProducts } from "../../service/productService/productsService";
import { useEffect, useState } from "react";
import BarChart  from "../../chart/barChart"
import DoughnutChart from "../../chart/Doughnut";
const Dashboard = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GetProducts();
        setProductData(response.pr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);
 //category
  const arr = [];
  productData.map((item) => {
    return arr.push(item.category);
  });
  let newArr = [...new Set(arr)];

  //total products
  let sum = 0;
const totalProducts = productData.length
  productData.map((item) => {
    return (sum += item.price);
  });
 
  //out of stock
  let outOfStock = 0;
  productData.filter((item) => {
    if (item.quantity == 0) {
      return (outOfStock += 1);
    }
  });

  //total quantity
  const quantity = productData.reduce((a, b) => a + b.quantity, 0);
   const totalStoreWorth = quantity * sum;
 

  const name  = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : ""

  return (
    <div className="p-[5vmax] max-md:w-full max-md:left-0 w-[calc(100%-16%)] absolute left-48 top-0 ">
            <div className="border-b-4 flex justify-center items-center w-full border-gray-300 ml-9 h-24">
        <div className=" mb-4 text-3xl font-serif  text-shadow-2 max-md:text-2xl text-black ">{name}{"'s"}<span className="text-orange-400 font-serif">&nbsp; Inventory</span></div></div>
      <div className=" grid gap-3 mt-7  ml-9 gap-y-5 grid-cols-1 sm:grid-cols-1 grid-flow-row-dense  md:grid-cols-2 lg:grid-cols-3">

         <div className=" h-32 flex  justify-center items-center w-full bg-gray-100  rounded-xl shadow-lg mb-4">
          <div className="text-lg font-bold text-gray-500"><span className="text-black">Total Category:</span> {newArr.length}</div>
        </div>
        <div className="bg-gray-100 h-32  flex justify-center items-center w-full rounded-xl shadow-lg mb-4">
          <div className="text-lg font-bold text-gray-500"><span className="text-black">Total Quantity:</span> {quantity}</div>
        </div>
        <div className="bg-gray-100 h-32 flex  justify-center items-center w-full rounded-xl shadow-lg mb-4">
          <div className="text-lg font-bold text-gray-500"><span className="text-black">Total Products:</span> {totalProducts}</div>
        </div>
        <div className="bg-gray-100 h-32 flex justify-center items-center w-full rounded-xl shadow-lg mb-4">
          <div className="text-lg font-bold text-gray-500"><span className="text-black">Total Store Worth:</span> ₹{totalStoreWorth}</div>
        </div>

        <div className="bg-gray-100 h-32 flex justify-center items-center w-full  rounded-xl shadow-lg mb-4">
          <div className="text-lg font-bold text-gray-500"><span className="text-black">Out Of Stock:</span> {outOfStock}</div>
        </div>
        
      </div>
      <div className="ml-6 grid gap-11 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
<div className=" mt-12 bg-gray-100 p-14 rounded-2xl col-span-1 shadow-2xl" style={{width:"99%", height:"70vh"}}>        
<BarChart />
</div>
<div  className=" bg-gray-100 p-14 rounded-2xl shadow-2xl" style={{width:"80%"}}>
<DoughnutChart />
</div>
        

      </div>

    </div>
  );
};

export default Dashboard;
