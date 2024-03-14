import React, { useEffect, useState } from 'react';
import authService from '../../service/auth';
import getService from '../../service/get';
import { Link } from 'react-router-dom';
import './item.css';


function Item() {

  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  // const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [getsupplierName, setGetSupplierName] = useState([])
  const [newItemName, setNewItemName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newSupplier, setNewSupplier] = useState('');

  const [view, setView] = useState('');
  const [view2, setView2] = useState('');
  const [view3, setView3] = useState('');
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {   
    getService.getitem().then((a) => {
      setItem(a.item);
    }),
    getService.getsupplier().then((a) => {
      setGetSupplierName(a.suppliers)
    })
  }, [refresh])

  const handleItemDetails = async (e) => {
    const itemname = e.target.value
    const details = await getService.getitemdetails(itemname)
    setItemName(details.itemdetails.itemname)
    setQuantity(details.itemdetails.quantity);
    setUnitPrice(details.itemdetails.unit_price);
    setSupplier(details.itemdetails.supplier)

  }

  const handleUpdateDetails= async (e)=>{
  
    e.preventDefault();

    if (itemName && quantity && unitPrice && supplier) {
      const updatedetails = {
        itemname: itemName,
        quantity: quantity,
        unit_price: unitPrice,
        supplier: supplier,
      };
console.log(updatedetails)
      const res = await getService.updatedetails(updatedetails);
      setItemName('');
      setQuantity('');
      setUnitPrice('');
      setSupplier('');

      setRefresh(!refresh)
      console.log(res.message)

      setView3(res.message);

    } else {
      setView2('Enter All Details of Item')
    }

  }
  

  const handleItem = async (e) => {
    e.preventDefault();

    if (newItemName && newQuantity && newPrice && newSupplier) {
      const newitem = {
        itemname: newItemName,
        quantity: newQuantity,
        unit_price: newPrice,
        supplier: newSupplier,
      };

      const res = await authService.additem(newitem);
      setNewItemName('');
      setNewQuantity('');
      setNewPrice('');
      setNewSupplier('');

      setRefresh(!refresh)

      setView(res.message);

    } else {
      setView2('Enter All Details of Item')
    }

  }

  return (
    <div className='fullbody'>
      <header><h1><b>ADD / UPDATE ITEMS </b></h1></header><br />

      <div className='updatediv'>
        <h2 className='updatehead'>UPDATE ITEM</h2> <hr />

        <form onSubmit={handleUpdateDetails}>

        <label htmlFor="item">Item : </label>
          {item.length > 0 && (
            <select
              className='custom-select'
              value={itemName}
              name='item'
              onChange={handleItemDetails}>

              <option value="">--select--</option>
              {
                item.map((data, i) => {

                  return <option key={i + 1} value={data.itemname}

                  >{data.itemname}
                  </option>

                })
              }
            </select>
          )}
          &nbsp; &nbsp;

          <label htmlFor="" >Quantity : </label>
          <input
            className='custom-select'
            type="number"
            placeholder='0'
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} /> &nbsp;

          <label htmlFor="unitprice">Unit price (₹) : </label>
          <input
            type="number"
            datatype='currency'
            min={0}
            placeholder='₹00.00'
            className='custom-select'
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)} />&nbsp;

          <label htmlFor="supplier">Supplier : </label>
          <select
           className='custom-select'
            placeholder='supplier name..'
            list="supplier"
            name="supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}>
            <option value="">---select---</option>
            {
              getsupplierName.map((data, i) => (
                <option value={data.suppliername} key={i + 1}>{data.suppliername}</option>
              ))
            }
          </select>


          &nbsp;&nbsp;

          <button
            type='submit'
            className='button1'>update</button>
        </form>  <br />
        <p className='view3'>{view3}</p>
         </div> <br />
      <div className='updatediv1'>
        <h2 className='updatehead'>ADD NEW ITEM</h2> <hr />

        <form action=""
          onSubmit={handleItem}>
          <label
            htmlFor="new item name"
          >New Item Name : </label>
          <input
            type="text"
            placeholder='item name...'
            className='input_border'
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />  &nbsp;&nbsp;

          <label htmlFor="quantity">Quantity :</label>
          <input
            className='input_border'
            type="number"
            placeholder='quantity...'
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)} /> &nbsp;&nbsp;

          <label htmlFor="unit price">Unit Price (₹) :</label>
          <input
            className='input_border'
            type="number"
            placeholder='price...'
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)} /> &nbsp;&nbsp;

           <label htmlFor="supplier">Supplier : </label>
          <select            
            list="supplier"
            name="supplier"
            value={newSupplier}
            className='input_border'
            onChange={(e) => setNewSupplier(e.target.value)}>
            <option value="">---select---</option>
            {
              getsupplierName.map((data, i) => (
                <option value={data.suppliername} key={i + 1}>{data.suppliername}</option>
              ))
            }
          </select>


          &nbsp;&nbsp;

          <button
            type='submit'
            className='button1'
            >add</button>
        </form>
      </div>

      <p className='view1'>{view}</p>
      <p className='view'> {view2} </p>

      <p><b>Note :</b> You can <Link to='/addsupplier'>Add a new supplier </Link>here. </p>



    </div>
  )
}


export default Item;
{/* <label htmlFor="category">Category : </label>
            <select style={{backgroundColor : 'lightgrey'}} name="category" id="" onChange={(e)=>setCategory(e.target.value)}>
                <option value="">---select---</option>
                <option value="Catagory-1">Catagory-1</option>
                <option value="Catagory-2">Catagory-2</option>
                <option value="Catagory-3">Catagory-3</option>
                <option value="Catagory-4">Catagory-4</option>
                <option value="Catagory-5">Catagory-5</option>
            </select>&nbsp; */}