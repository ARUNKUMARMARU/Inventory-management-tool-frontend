import axios from "axios";

 const baseURl = 'https://inventory-management-tool-backend-shqe.onrender.com/api'; 
//const baseURl = 'http://localhost:6001/api'
const authInstance =axios.create({
    baseURL : baseURl,
    timeout : 15000,
    headers : {
        "Content-Type" : "application/json"
    }
});

const protectedInstance = axios.create({
    baseURL : baseURl,
    timeout : 15000,
    headers : {
        "Content-Type" : "application/json"
    }
});

protectedInstance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'bearer ' + token;
        }
        return config;
    }
);

export default {
    authInstance,
    protectedInstance
};