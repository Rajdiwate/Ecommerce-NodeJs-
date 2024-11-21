import axios from "axios";

export const axiosInstance  = axios.create({
    baseURL : `${import.meta.env.VITE_API_ENDPOINT}/api`
})

axiosInstance.interceptors.request.use(
    (config)=>{
        config.withCredentials = true;
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)


// axiosInstance.interceptors.response.use(
//     (response) => {
//         // Handle the response
//         // Example: Directly return the data property
//         return response.data;
//     },
//     (error) => {
//         // Handle errors
//         if (error.response) {
//             // Server responded with a status code outside 2xx
//             if (error.response.status === 401) {
//                 console.error('Unauthorized access - redirecting to login.');
//                 // Redirect to login or take appropriate action
//                 window.location.href = '/auth'; // Adjust to your app's login page
//             } else if (error.response.status === 500) {
//                 console.error('Server error - please try again later.');
//             }
//         } else if (error.request) {
//             // No response received
//             console.error('No response received:', error.request);
//         } else {
//             // Other errors
//             console.error('Error setting up request:', error.message);
//         }

//         // Reject the promise so it can be handled in .catch()
//         return Promise.reject(error);
//     }
// );