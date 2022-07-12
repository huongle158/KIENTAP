import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import DashboardProductTable from './DashboardSubscriberTable'
import DashboardSubscriberCreate from './DashboardSubscriberCreate'
import DashboardSubscriberEdit from './DashboardSubscriberEdit'
import {faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



export default function DashboardSubscriber(props) {

    const [email, setEmail] = useState([])
  
    const table = [
        "Email",
        "Sent",
        "Read",
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
                    <div className="total-count-icon"> 
                       
                    </div>
                    <div className="container-product-title"> 
                    Subcribers
                    </div>
                    <div className='flex space-between container-product-buttons '>
                        <div className='product-add' onClick={toggleActive}><div>Add new</div></div>
                        <div class="search-box">
                        <input type="text" class="input-search" placeholder="Type to Search..." />
                        </div>
                    </div>
                        <DashboardProductTable
                            table={table}
                            toggleEdit={toggleEdit}
                        />
                         {openCreate &&  <DashboardSubscriberCreate
                            toggleActive={toggleActive}
                            email={email}
                        />}
                        {openEdit &&  <DashboardSubscriberEdit
                            toggleEdit={toggleEdit}
                            email={email}
                        />}
            </div>
        </div>
    )
}