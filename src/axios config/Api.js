import axios from 'axios'



const countriesAPI = axios.create({
    baseURL: "https://www.universal-tutorial.com/api",

})


export default countriesAPI 