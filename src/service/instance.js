import axios from "axios";

const baseURl = 'http://localhost:6001/api'; 
const token = sessionStorage.getItem('token');

const authInstance =axios.create({
    baseURL : baseURl,
    timeout : 5000,
    headers : {
        "Content-Type" : "application/json"
    }
});

const protectedInstance = axios.create({
    baseURL : baseURl,
    timeout : 5000,
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