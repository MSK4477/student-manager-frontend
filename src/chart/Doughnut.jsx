import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { GetProducts } from "../service/productService/productsService.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      display: true,
    },
    title: {
      display: false,
    },
  },
  cutoutPercentage: 100,
};

const DoughnutChart = () => {
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

  // category
  const arr = [];
  productData.map((item) => {
    return arr.push(item.category);
  });
  let newArr = [...new Set(arr)];

  // total products
  let sum = 0;
  const totalProducts = productData.length;
  productData.map((item) => {
    return (sum += item.price);
  });

  // total quantity
  const quantity = productData.reduce((a, b) => a + b.quantity, 0);

  const data = {
    labels: ["Category", "Quantity", "Stock"],
    datasets: [
      {
        data: [newArr.length, quantity, totalProducts],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        borderWidth: 8,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
