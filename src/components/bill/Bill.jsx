// import React, { useEffect, useState } from 'react';
// import authService from '../../service/auth';
// import getService from '../../service/get';
// import Table from 'react-bootstrap/Table';
// import { Collapse } from 'bootstrap';
// import './Bill.css';


// function Bill() { 
//   const [item, setItem] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');  
//   const [amount, setAmount] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [allBills, setAllBills] = useState([]);
//   const [view, setView] = useState('');
//   const [view2, setView2] = useState('');
//   const [getItem, setGetItem] = useState([]);


//   useEffect(()=>{
//     getService.getitem().then((a)=>{     
//       setGetItem(a.item)})   
//   },[])

//   const handleBillButton = ()=>{
//   if(item && quantity && price){
//     const a = Number(quantity) * price   
//     setTotalAmount(totalAmount + a)

//     setAllBills([...allBills, {s_no : allBills.length+1,items : item,quantity,unit_price : price ,amount : a, total_amount : totalAmount+a}])   


//     setItem('');
//     setPrice('');
//     setQuantity('');

//   }else{
//     setView2("Kindly Fill All the Details of Item")
//   }

//   }

//   const handleBill = async ()=>{  
//     const newBill = allBills     

//   const res = await authService.addbill(newBill);
//   setView(res.message);

//   }

//   return (
//     <div>
//     <header><h1><b>INVOICE</b></h1></header>

//     <div >

//         <div className='form-group'>
//         <label htmlFor="">Item : </label>
//        <select className='custom-select'
//        value={item}   
//        onChange={e=>setItem(e.target.value)}>
//         <option value="">--select--</option>
//         {
//           getItem.map((data,i)=>{
//             return <option key={i+1} value={getItem[data._id]}>{data.itemname}</option>
//           })
//         }       
//         </select> &nbsp;

//         <label htmlFor="">Quantity : </label>
//         <input type="number"
//         value={quantity}
//         onChange={(e)=>setQuantity(e.target.value)}/>  &nbsp;

//         <label htmlFor="">Price : </label>
//         <input type="number" 
//         value={price}
//         onChange={(e)=>setPrice(e.target.value)}/>  &nbsp;         


//     <button className='invoice-button2'

//     onClick={()=>handleBillButton()} >add item</button> 
//     <span className='view'>{view2}</span>
//         </div>


//     <Table className='invoice-table' >

//     <tr  >
//       <th >S-No</th>
//       <th>Item</th>
//       <th>Quantity</th>
//       <th>Price</th>
//       <th>Amount</th>
//       <th>Total Amount</th>
//     </tr> 

//        {

//           allBills.map((data, i)=>(
//             <tbody>
//             <tr key={i+1}>
//               <td>{i+1}</td> 
//               <td>{data.items}</td> 
//               <td>{data.quantity}</td>
//               <td>{data.unit_price}</td> 
//               <td>{data.amount}</td> 
//               <td>{data.total_amount}</td> 
//             </tr>   </tbody>
//           ))

//         }

//       </Table>
//       </div>  

//     <div ><button className='invoice-button'

//     onClick={()=>handleBill()}>Get Bill</button></div> <br /><br />
//     <p>{view}</p>

//     </div>
//   )
// }

// export default Bill;






import React, { useEffect, useState } from 'react';
import authService from '../../service/auth';
import getService from '../../service/get';
import Table from 'react-bootstrap/Table';
import { Collapse } from 'bootstrap';
import './Bill.css';
import { Link } from 'react-router-dom';


function Bill() {  
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    price: ""
  })
  const [mobileNo, setMobileNo] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [allBills, setAllBills] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState([]);
  const [view, setView] = useState('');
  const [view2, setView2] = useState('');
  const [getItem, setGetItem] = useState([]);
  const [amountMsg, setAmountMsg] = useState('');


  useEffect(() => {
    getService.getitem().then((a) => {
      setGetItem(a.item);
    });
  }, []); 

  const handleItem = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    getItem.map((item) => {
      if (item.itemname === e.target.value) {
        setFormData({ ...formData, 'item' : item.itemname, "price": item.unit_price })
      }
    })
    }

  const handleBillButton = () => {
   // console.log(formData.item, formData.quantity, formData.price)
    if (formData.item && formData.quantity && formData.price) {
      const a = Number(formData.quantity) * formData.price
      setTotalAmount(totalAmount + a)

      setAllBills([...allBills, { s_no: allBills.length + 1, items: formData.item, quantity: formData.quantity, unit_price: formData.price, amount: a, total_amount: totalAmount + a }])

      setUpdateQuantity([...updateQuantity,{ items: formData.item, quantity: formData.quantity }])

      setFormData({
        item: "",
        quantity: "",
        price: ""
      });
      

    } else {
      setView2("Kindly Fill All the Details of Item")
    }

  }

  const handleBill = async () => {
    const newBill = allBills    

    const res = await authService.addbill(newBill);
    setView(res.message);  
    
    setAllBills([])

    await getService.editquantity(updateQuantity)

   

  }

  const setNo = (e)=>{
    setMobileNo(e.target.value)
  }

  const handleNo = async ()=>{    
    const details = {
      mobileNo,
      totalAmount
    }
   
    const res = await getService.editamount(details);  
    setMobileNo('')
    
    setAmountMsg(res.data.message)
  }

  return (
    <div>
      <header><h1><b>INVOICE</b></h1></header>

      <div >       

        <div className='form-group'>
          <label htmlFor="item">Item : </label>
          {getItem.length > 0 && (
            <select
              className='custom-select'
              value={formData.item}
              name='item'
              onChange={handleItem}>

              <option value="">--select--</option>
              {
                getItem.map((data, i) => {

                  return <option key={i + 1} value={data.itemname}

                  >{data.itemname}
                  </option>

                })
              }
            </select>
          )}
          &nbsp;

          <label htmlFor="quantity">Quantity : </label>
          <input
            type="number"
            name='quantity'
            value={formData.quantity}
            onChange={handleItem} />  &nbsp;

          <label htmlFor="price">Price : </label>
          <input
            type="number"
            name='price'
            value={formData.price}
            onChange={handleItem} />  &nbsp;


          <button className='invoice-button2'

            onClick={() => handleBillButton()} >
            add item
          </button>
          <span className='view'>{view2}</span>
        </div>


        <Table className='invoice-table' >

          <thead>
            <tr  >
              <th >S-No</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {
              allBills.map((data, i) => (

                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{data.items}</td>
                  <td>{data.quantity}</td>
                  <td>{data.unit_price}</td>
                  <td>{data.amount}</td>
                  <td>{data.total_amount}</td>
                </tr>
              ))
            }
          </tbody>

        </Table>
      </div>

      <div ><button className='invoice-button'

        onClick={(e) => handleBill(e)}>
        Get Bill
      </button></div> <br />
      <p className='success'>{view}</p> <br />

      <div>
       <label htmlFor="mobile no">Customer Mobile number : </label>
        <input type="number"
        placeholder='Mobile no'   
        value={mobileNo}    
        name='Mobile no'
        onChange={setNo}
        />
        <button onClick={handleNo}>Enter</button> <span className='amountmsg'>{amountMsg}</span>
       
       </div>
      
      <p>Add New Customer..? <Link to='/addcustomer'>click here</Link></p>

    </div>
  )
}

export default Bill;