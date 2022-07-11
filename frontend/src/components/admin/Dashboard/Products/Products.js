import React, { useEffect, useRef, useState } from 'react'
import ProductEdit from './ProductEdit'
import ProductTable from './ProductTable'
import ProductCreate from './ProductCreate'
import axios from 'axios'
import '../../../../Styles/DashboardProducts/DashboardProduct.css' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTshirt } from '@fortawesome/free-solid-svg-icons'




function Products(props){
    const [product, setProduct] = useState({})
    const [constProducts, setConstProducts] = useState([])
    const [value, setValue] = useState("")
    useEffect(()=> {
        axios.get(``)
            .then(res => {
                setProduct(res.data)
                setConstProducts(res.data)
            } 
        )},[])
   

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
        <div className="container-products ">
                <div className={`total-count-icon pink`}
                 > 
                   <FontAwesomeIcon icon={faTshirt} className="icon"/>
                </div>
                <div className="container-product-title"> 
                   Products
                </div>
                <div className='flex space-between container-product-buttons '>
                    <div className='product-add' onClick={toggleActive}><div>Add new</div></div>
                    <div class="search-box">
                    
                    <input type="text" class="input-search" placeholder="Type to Search..." 
                         />
                   
                    
                    </div>
                </div>
              
                    <ProductTable 
                        table={table}
                        toggleEdit={toggleEdit}
                        product={product}
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