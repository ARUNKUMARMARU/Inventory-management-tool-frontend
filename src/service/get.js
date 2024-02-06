import axios from "axios";

import instance from "./instance";



const getService = {
    getstaff : async()=>{
        try{
            console.log("Fetching staff details...");
            const res = await instance.protectedInstance.get('/getstaff');

            console.log('staffs: ', res.data);           

             
                return res.data.staffs
            
            

        }catch(error){
            return 'Error fetching staff: ', error;
        }
    },

    getitem : async()=>{
        try{
            console.log("Fetching item details...");
            const res = await instance.protectedInstance.get('/getitem');

            console.log('items : ', res.data);           

             
                return res.data
        }catch(error){
            return 'Error fetching item: ', error;
        }
    },

    getsupplier : async()=>{
        try{
            console.log("Fetching supplier details...");
            const res = await instance.protectedInstance.get('/getsupplier');

            console.log('suppliers : ', res.data);      
                return res.data
                
        }catch(error){
            return 'Error fetching item: ', error;
        }
    }
}

export default getService;