import axios from "axios";

import instance from "./instance";
import authService from "./auth";



const getService = {
    getstaff : async()=>{
        try{
            
            const res = await instance.protectedInstance.get('/getstaff');

                return res.data.staffs        

        }catch(error){
            return 'Error fetching staff: ', error;
        }
    },

    getitem : async()=>{
        try{
           
            const res = await instance.protectedInstance.get('/getitem');             
                return res.data
        }catch(error){
            return 'Error fetching item: ', error;
        }
    },

    getitemdetails : async(itemname)=>{
        try{
           
            const res = await instance.protectedInstance.get(`/getitemdetails/${itemname}` );   
                      
                return res.data
        }catch(error){
            return 'Error fetching itemdetails: ', error;
        }
    },

    getsupplier : async()=>{
        try{
            
            const res = await instance.protectedInstance.get('/getsupplier');
            
                return res.data
                
        }catch(error){
            return 'Error fetching item: ', error;
        }
    },

    getcustomer : async()=>{
        try{
            
            const res = await instance.protectedInstance.get('/getcustomer');
            
                return res.data.customer
                
        }catch(error){
            return 'Error fetching item: ', error;
        }
    },
    editcustomer : async(updateCustomer)=>{
        try{
            
            const res = await instance.protectedInstance.put('/editcustomer',updateCustomer);
           
                return res.data
                
        }catch(error){
            return 'Error editing item: ', error;
        }
    },

    deletecustomer : async(id)=>{
        try{           
            const res = await instance.protectedInstance.delete(`/deletecustomer/${id}`);
           
            return res

        }catch(error){
            return 'error :' , error
        }
    },

    editamount : async(details)=>{
        try{
           
            const res = await instance.protectedInstance.patch('/editamount', details)
            return res;
        }catch(error){
            return 'error :', error
        }
    },

    updatedetails : async(updatedetails)=>{
        try{
            
            const res = await instance.protectedInstance.put('/updatedetails', updatedetails);
            
                return res.data
                
        }catch(error){
            return 'Error updating item: ', error;
        }
    },

    editquantity : async(updateQuantity)=>{
        try{
            await instance.protectedInstance.put('/editquantity', updateQuantity)
        }catch(error){
            return error
        }
    }
}

export default getService;