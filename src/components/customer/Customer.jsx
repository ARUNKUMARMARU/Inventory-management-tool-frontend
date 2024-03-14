import React, { useEffect, useState } from 'react';
import authService from '../../service/auth';
import getService from '../../service/get';
import './Customer.css';
import { Link } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Customer() {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [totalPurchase, setTotalPurchase] = useState('');
  const [error, setError] = useState('');
  const [getCustomer, setGetCustomer] = useState([]);
  const [id,setId] = useState('');
  const [deleteCustomer, setDeleteCustomer] = useState('')
  const [refresh, setRefresh] = useState(false)

  const [view, setView] = useState('');
  useEffect(() => {
    getService.getcustomer().then((e) => {
      setGetCustomer(e)     
    })
    if(view!=""){
      notify()
    }
  }, [view])


  const handleCustomer = async (e) => {
    e.preventDefault();

   if(!id){
    if (!name.trim()) {
      setError("Enter Customer Name")
    } else if (!/^\d{10}/.test(mobileNo)) {
      setError("Please enter a valid 10-digit mobile number.")
    } else {
      const newCustomer = {
        customername: name,
        mobile_number: mobileNo,
        total_purchase: totalPurchase
      };

      const res = await authService.addcustomer(newCustomer);

      setMobileNo('');
      setName('');
      setTotalPurchase('');

     setView(res.message)
    
    // setRefresh(!refresh)
     
    }   
   }else{
    const updateCustomer = {
      customername: name,
      mobile_number: mobileNo,
      total_purchase: totalPurchase,
      _id: id
    }
   const res2 = await getService.editcustomer(updateCustomer)   

   setMobileNo('');
   setName('');
   setTotalPurchase('');

   setView(res2.message)
   setRefresh(!refresh)
   setId('')
   }

  }

  const handleEdit = (data) => {   
    setName(data.customername);   
    setMobileNo(data.mobile_number);
    setTotalPurchase(data.total_purchase) 
    setId(data._id);    
  }

  const handleDelete =async (data)=>{    
   
    const res3 = confirm(`Are you sure Do you want to delete ${data.customername}'s details`);
    if(res3){
      const res4 = await getService.deletecustomer(data._id);      
     setDeleteCustomer(res4.data.message);
     setRefresh(!refresh)
    }
  }

  const notify = () => {
    const style = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    };
  toast.success(view, style);
  };

  return (
    <div > 
      <header><h1><b>ADD CUSTOMER</b></h1></header>

      <div className='container'>
        <form
          className='form-container'
          action=""
          onSubmit={handleCustomer}>

          <label htmlFor="name"
            className='label'
          >Customer Name : </label>
          <input
            type="text"
            placeholder='name here...'
            className='input12'
            value={name}
            onChange={(e) => setName(e.target.value)} /> <br />

          <label htmlFor="name"
            className='label'
          >Mobile Number : </label>
          <input type="tel"
            pattern='[0-9]{10}'
            placeholder='10 digits'
            value={mobileNo}
            className='input12'
            onChange={(e) => setMobileNo(e.target.value)} /> <br />

          <label htmlFor="name"
            className='label'
          >Total Purchase (₹) : </label>
          <input type="number"
            className='input12'
            value={totalPurchase}
            placeholder='₹00.00'
            onChange={(e) => setTotalPurchase(e.target.value)} /> &nbsp;&nbsp;&nbsp;

          <button type='submit'
            className='button1'
          >Submit</button>

          <p className='error5'>{error}</p>
          
        </form>
        <br />
      </div>     

      <div className='table-container'>
        <div >
        <p className='deletemessage'>{deleteCustomer}</p>
        </div> <br />

        <p>Go to Bill page <Link to='/billing'>clickhere</Link></p>
        <table>
          <thead>
            <tr>
              <th>S-No</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Total Purchase</th>
              <th colSpan={2}>Actions</th>

            </tr>
          </thead>
          <tbody>

            {getCustomer.map((data, i) => {
              return <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.customername}</td>
                <td>{data.mobile_number}</td>
                <td>{data.total_purchase}</td>
                <td colSpan={2}><button
                  className='button8'
                  onClick={()=>handleEdit(data)}
                >
                  edit
                </button> <button
                  className='button6'
                  onClick={()=>handleDelete(data)}
                >
                    delete
                  </button></td>

              </tr>
            })}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Customer;


// const style = {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "dark",
//   transition: Bounce,
// };
// toast.success("message", style);
// Arunprgash A P
// 3:24 PM
// const dummy = useState('');
// const view = dummy[0];
// const setView = dummy[1];