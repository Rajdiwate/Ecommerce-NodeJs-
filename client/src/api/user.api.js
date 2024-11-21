import { axiosInstance } from "../utils/axios"


export const registerUser = async({avatar ,name , email , password})=>{
    try {
        const formData = new FormData();
        formData.append('avatar' , avatar)
        formData.append('name' , name )
        formData.append('email' , email )
        formData.append('password' , password )

        const {data} = await axiosInstance.post('/register' , formData , {
            headers : {
                'Content-Type': 'multipart/form-data',
            }
        })

        return data
    } catch (error) {
        console.log("register user error :" , error.response.data)
        return error.response.data
    }
}
