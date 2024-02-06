import React, { useEffect, useState } from 'react';
import authService from '../service/auth';
import getService from '../service/get';
import Table from 'react-bootstrap/Table';
import { Collapse } from 'bootstrap';


function Bill() { 
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');  
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [allBills, setAllBills] = useState([]);
  const [view, setView] = useState('');
  const [getItem, setGetItem] = useState([]);
  

  useEffect(()=>{
    getService.getitem().then((a)=>{
      console.log(a.item);
      setGetItem(a.item)})   
  },[])
  
  const handleBillButton = ()=>{
   const a = Number(quantity) * price
   console.log(a)
    setTotalAmount(totalAmount + a)

    setAllBills([...allBills, {s_no : allBills.length+1,items : item,quantity,unit_price : price ,amount : a, total_amount : totalAmount+a}])   
  
    
    setItem('');
    setPrice('');
    setQuantity('');
  
  }


  const handleBill = async ()=>{  
    const newBill = allBills  
    console.log(newBill)
  
  const res = await authService.addbill(newBill);
  setView(res.message);
       
  }

  return (
    <div>
    
    
    <div style={{paddingTop : "10px"}}>
        
        <div>
        <label htmlFor="">Item : </label>
       <select style={{backgroundColor:'lightgray'}}
       value={item}   
       onChange={e=>setItem(e.target.value)}>
        <option value="">--select--</option>
        {
          getItem.map((data,i)=>{
            return <option key={i+1} value={getItem[data._id]}>{data.itemname}</option>
          })
        }       
        </select> &nbsp;

        <label htmlFor="">Quantity : </label>
        <input type="number" style={{backgroundColor:'lightgray'}}
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}/>  &nbsp;

        <label htmlFor="">Price : </label>
        <input type="number" style={{backgroundColor:'lightgray'}}
        value={price}
        onChange={(e)=>setPrice(e.target.value)}/>  &nbsp;         

    
    <button
    style={{backgroundColor:'lightgreen'}}
    onClick={()=>handleBillButton()} >add item</button> <br />
        </div> <br />

   
    <Table responsive style={{borderCollapse : Collapse}} >

    <tr style={{backgroundColor : 'grey'}} >
      <th >S-No</th>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Amount</th>
      <th>Total Amount</th>
    </tr> 
        {
          allBills.map((data, i)=>(
            <tr key={i+1} style={{backgroundColor : 'lightgrey', border : '1px solid black'}}>
              <td>{i+1}</td> 
              <td>{data.items}</td> 
              <td>{data.quantity}</td>
              <td>{data.unit_price}</td> 
              <td>{data.amount}</td> 
              <td>{data.total_amount}</td> 
            </tr> 
          ))
        }
      </Table>
      </div>  <br />
    
    <div ><button 
    style={{paddingLeft : '20px', backgroundColor:'blue', color:'white'}}
    onClick={()=>handleBill()}>Get Bill</button></div> <br /><br />
    <p>{view}</p>
    
    </div>
  )
}

export default Bill;