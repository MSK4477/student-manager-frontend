import axios from "axios"


//Create a new product
export const createProducts =  async(productData) => { 

    const response = await axios.post(`https://inventory-billing-backend-l6kc.onrender.com/product`,productData, {
        withCredentials:true,
    })
    return response.data

}
//Get all products
export const GetProducts =  async() => { 

    const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/product`, {
        withCredentials:true,
    })
    return response.data

}

//Get a product
export const getProduct =  async(id) => { 

    const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/product/${id}`, {
        withCredentials:true,
    })
    return response.data

}

//update a product
export const updateProduct =  async(id,productData) => { 

    const response = await axios.post(`https://inventory-billing-backend-l6kc.onrender.com/product/update/${id}`,productData, {
        withCredentials:true,
    })
    return response.data

}


//delete a product
export const deleteProduct =  async(id) => { 

    const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/product/delete/${id}`, {
        withCredentials:true,
    })
    return response.data

}