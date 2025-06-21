import { useState, useEffect } from 'react'
import { getUser } from "../service/userService/authService"

const useUser = () => {

const [user, setUser] = useState(null)

const [loading, setLoading] = useState(false)

const getUSer = async () => {
    try {
    const response = await getUser()
    
    setUser(response)
    console.log(response)

    if(response.data){
        setLoading(false)
    }

}catch(error){
    console.log(error)
    setLoading(false)
}

}
useEffect (() =>  { 
    getUSer()
    setLoading(true)
}, [])

return [user, loading]


}
export default useUser