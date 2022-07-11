
import React, { useEffect, useRef, useState } from 'react'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import OrderTable from './OrderTable'
import OrderCreate from './OrderCreate'
import OrderEdit from './OrderEdit'

import axios from 'axios'
import '../../../../Styles/DashboardProducts/DashboardProduct.css' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
function DoashBoardOrders(){
        const [Order, setOrder] = useState({})
        const [constOrder, setConstOrder] = useState([])
    
        const table = [
            "Order Info",
            "ShippingInfo",
            "Date",
            "PaymentMethod",
            "Items",
            "Total Money",    
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
    return(
        <div className='container-product'>
            <div className="container-products">
                    <div className={`total-count-icon orange`}
                    > 
                        <FontAwesomeIcon icon={faUser} className="icon"/>
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
                        <OrderTable
                            table={table}
                            toggleEdit={toggleEdit}
                            
                        />
                         {openCreate &&  <OrderCreate 
                            toggleActive={toggleActive}
                            Order={Order}
                        />}
                        {openEdit &&  <OrderEdit
                            toggleEdit={toggleEdit}
                            Order={Order}
                        />}
            </div>
        </div>
    )
}
export default DoashBoardOrders