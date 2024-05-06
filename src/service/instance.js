import axios from "axios";

// const baseURl = "http://16.171.58.165:6001/api";
 const baseURl = 'https://inventory-management-tool-backend-shqe.onrender.com/api'; 
// const baseURl = 'http://localhost:6001/api'
const authInstance =axios.create({
    baseURL : baseURl,
    timeout : 15000,
    headers : {
        "Content-Type" : "application/json",
        'Access-Control-Allow-Origin': '*'
    }
});

const protectedInstance = axios.create({
    baseURL : baseURl,
    timeout : 15000,
    headers : {
        "Content-Type" : "application/json",
        'Access-Control-Allow-Origin': '*'
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