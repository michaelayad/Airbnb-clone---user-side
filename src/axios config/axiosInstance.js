import axios from 'axios'


const axiosInstance = axios.create({
    // baseURL: `${process.env.SERVER_LINK}`,

    baseURL: "https://airbnbclone-backside.onrender.com",


})


export default axiosInstance 