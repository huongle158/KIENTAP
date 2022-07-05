import React, { useEffect, useRef, useState } from 'react'
import ProductEdit from './ProductEdit'
import ProductTable from './ProductTable'
import ProductCreate from './ProductCreate'
import axios from 'axios'
import '../../../../Styles/DashboardProducts/DashboardProduct.css' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



function Products(props){
    const [product, setProduct] = useState({})
    useEffect(()=> {
        axios.get(`http://pe.heromc.net:4000/products/${props.productId}`)
            .then(res => {
                setProduct(res.data)
            } 
        )})
    

    const table = [
        "Name",
        "Images",
        "Price",
        "Sale",
        "Sold",
        "Date",    
        "Rating",
        "Action"
    ]
    const [openCreate, setOpenCreate] = useState(false)
    const toggleActive = ()=>{
        setOpenCreate(openCreate === true ? false : true)   
    }
    const [openEdit, setOpenEdit] = useState(false)
    const toggleEdit = ()=>{
        setOpenEdit(openEdit === true ? false : true)   
    }
return (
    <div className='container-product'>
        <div className="container-products">
                <div className={`total-count-icon`}
                 > 
                    icon
                </div>
                <div className="container-product-title"> 
                   Products
                </div>
                <div className='flex space-between container-product-buttons '>
                    <div className='product-add' onClick={toggleActive}><div>Add new</div></div>
                    <div class="search-box">
                    <input type="text" class="input-search" placeholder="Type to Search..." />
                    </div>
                </div>
              
                    <ProductTable 
                        table={table}
                        toggleEdit={toggleEdit}
                    />
               
              
                {openCreate &&  <ProductCreate 
                        toggleActive={toggleActive}
                        product={product}
                    />}
                     {openEdit &&  <ProductEdit 
                        toggleEdit={toggleEdit}
                        product={product}
                    />}
        </div>
    </div>
)
}
export default Products