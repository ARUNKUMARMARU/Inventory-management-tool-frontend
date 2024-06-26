import axios from "axios";
import instance from "./instance";

// define the authentication service
const authService = {
    signup: async (user) => {
        try {
           
            const res = await instance.authInstance.post('/signup', user);

            

            if (res.data) {
                
                return res.data;
            } else {
                
                return res.data;
            }
        } catch (error) {
          
            return error.response.data;
        }
    },

    signin: async (user) => {
        try {
           
            const res = await instance.authInstance.post('/login', user);

           

            if (res.data) {               

                // store the token in the session storage
                sessionStorage.setItem('token', res.data.token);

                // store the user in the session storage
                sessionStorage.setItem('user', JSON.stringify({
                    username: res.data.username, name: res.data.name
                }));

                return res.data;
            } else {
               
                return res.data;
            }
        } catch (error) {
            
            return error.response.data;
        }
    },

    additem: async (newitem) => {
        try {
            console.log('Adding item...');
            const res = await instance.protectedInstance.post('/saveitem', newitem);

            console.log(res.data);

            if (res.data) {
                console.log('New item added to stock list');
                return res.data;
            } else {
                console.log('Error adding item');
                return res.data;
            }
        } catch (error) {
            console.log('Error adding item');
            return error.response.data;
        }
    },

    addcustomer: async (newCustomer) => {
        try {
            console.log('Adding customer details...');
            const res = await instance.protectedInstance.post('/addcustomer', newCustomer)
            console.log(res.data);

            if (res.data) {
                console.log('New customer details added');
                return res.data;
            } else {
                console.log('Error adding customer details');
                return res.data;
            }
        } catch (error) {
            console.log('Error adding customer');
            return error.response.data;
        }
    },

    addstaff : async (newStaff) => {
        try {
            console.log('Adding staff details...');
            const res = await instance.protectedInstance.post('/addstaff', newStaff);

            console.log(res.data);

            if (res.data) {
                console.log('New staff details added');
                return res.data;
            } else {
                console.log('Error adding staff details');
                return res.data;
            }
        } catch (error) {
            console.log('Error adding staff', error );
            return error.response.data;
        }
    },

    addsupplier: async (newSupplier) => {
        try {
            console.log('Adding supplier details...');
            const res = await instance.protectedInstance.post('/addsupplier', newSupplier)
            console.log(res.data);

            if (res.data) {
                console.log('New supplier details added');
                return res.data;
            } else {
                console.log('Error adding supplier details');
                return res.data;
            }
        } catch (error) {
            console.log('Error adding supplier');
            return error.response.data;
        }
    },

    attendence: async (newAttendence) => {
        try {
            
            const res = await instance.protectedInstance.post('/attendance', newAttendence)
            return res.data;
           
        } catch (error) {
            console.log('Error adding attendence', error.message);
            return error.response.data;
        }
    },

    addbill : async (allBill) => {
        try {
            console.log('Adding bill details...');
            const res = await instance.protectedInstance.post('/billing', allBill)
            console.log(res.data);

            if (res.data) {
                console.log('New bill added');
                return res.data;
            } else {
                console.log('Error adding bill');
                return res.data;
            }
        } catch (error) {
            console.log('Error adding bill', error.message);
            return error.response.data;
        }
    },
}

export default authService;