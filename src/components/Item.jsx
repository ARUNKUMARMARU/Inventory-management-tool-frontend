import React, { useEffect, useState } from 'react';
import authService from '../service/auth';
import getService from '../service/get';
import { Link } from 'react-router-dom';


function Item() {

    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [getsupplierName, setGetSupplierName] = useState([])

    const [view, setView] = useState('');

    useEffect(()=>{
      getService.getsupplier().then((a)=>{
        console.log(a.suppliers)
        setGetSupplierName(a.suppliers)
      })
    },[])

    const handleItem = async (e)=>{
        e.preventDefault();

        const newitem = {
            itemname : item,
            quantity : quantity,
            unit_price : unitPrice,
            category : category,            
            supplier : supplier,            
        };

      const res = await authService.additem(newitem);
       setItem('');
       setQuantity('');
       setUnitPrice('');
       setCategory('');
       setSupplier('');

        console.log(res.message)
setView(res.message);

    }

  return (
    <div>
      <div><b><u> <h2 style={{color:'darkgreen', textAlign : "center", paddingTop:'10px'}}>Add New Items To Stocks</h2></u></b></div> <br />
        
        <div>
           
           <form onSubmit={handleItem}>

           <label htmlFor="itemname">Item name : </label>
            <select name="" id="" style={{backgroundColor : 'lightgrey'}}
            onChange={(e)=>setItem(e.target.value)}>

                <option value="" >----select----</option>
                <optgroup label='Catagory-1'>
                <option value="Item-1.1">Item-1.1</option>
                <option value="Item-1.2">Item-1.2</option>
                <option value="Item-1.3">Item-1.3</option></optgroup>

                <optgroup label='Catagory-2'>
                <option value="item-2.1">item-2.1</option>
                <option value="item-2.2">item-2.2</option>
                <option value="item-2.3">item-2.3</option></optgroup>

                <optgroup label='Catagory-3'>
                <option value="item-3.1">item-3.1</option>
                <option value="item-3.2">item-3.2</option>
                <option value="item-3.3">item-3.3</option></optgroup>
            </select> &nbsp;

            <label htmlFor="" >Quantity : </label>
            <input style={{backgroundColor : 'lightgrey'}} type="number" placeholder='0'min={1} 
            onChange={(e)=>setQuantity(e.target.value)}/> &nbsp;

            <label htmlFor="unitprice">Unit price (₹) : </label>
            <input type="number" datatype='currency' min={0} placeholder='₹00.00' style={{backgroundColor : 'lightgrey'}}
            onChange={(e)=>setUnitPrice(e.target.value)}/>&nbsp;

            <label htmlFor="category">Category : </label>
            <select style={{backgroundColor : 'lightgrey'}} name="category" id="" onChange={(e)=>setCategory(e.target.value)}>
                <option value="">---select---</option>
                <option value="Catagory-1">Catagory-1</option>
                <option value="Catagory-2">Catagory-2</option>
                <option value="Catagory-3">Catagory-3</option>
                <option value="Catagory-4">Catagory-4</option>
                <option value="Catagory-5">Catagory-5</option>
            </select>&nbsp;

            <label htmlFor="supplier">Supplier : </label>
            <select style={{backgroundColor : 'lightgrey'}}
            placeholder='supplier name..' list="supplier" name="supplier"
            onChange={(e)=>setSupplier(e.target.value)}>
              <option value="">---select---</option>
              {
              getsupplierName.map((data,i)=>(
                <option value={data.suppliername} key={i+1}>{data.suppliername}</option>
              ))
            }
            </select>
           
            
            &nbsp;&nbsp; 

            <button type='submit' style={{backgroundColor : 'lightgreen'}}>Add to stock</button>            

           </form> <br />

           <p>{view}</p>

           <p><b>Note :</b> You can <Link to='/addsupplier'>Add a new supplier </Link>here. </p>
        </div>
    
    </div>
  )
}

export default Item;