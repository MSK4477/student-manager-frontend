import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { GetProducts } from "../service/productService/productsService.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Total Category", "Total Quantity" ,"Total Products"];

export default function BarChart() {
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
  console.log(productData)
//category
  const arr = [];
  productData.map((item) => {
    return arr.push(item.category);
  });
  let newArr = [...new Set(arr)];
  console.log(newArr);

  //total products
  let sum = 0;
const totalProducts = productData.length
  productData.map((item) => {
    return (sum += item.price);
  });
  console.log(totalProducts)


  //total quantity  
  const quantity = productData.reduce((a, b) => a + b.quantity, 0);
console.log(quantity)
 
  const data = {
    labels,
    datasets: [
      {
        label: "Product Details",
        data: [newArr.length, quantity, totalProducts, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
