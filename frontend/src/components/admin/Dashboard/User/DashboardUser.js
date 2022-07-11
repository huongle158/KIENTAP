import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import DashboardUserTable from './DashboardUserTable'
import DashboardUserCreate from './DashboardUserCreate'
import DashboardUserEdit from './DashboardUserEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function DashboardUser(props) {

    const [user, setUser] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const toggleActive = ()=>{
        setOpenCreate(openCreate === true ? false : true)   
    }
    const [openEdit, setOpenEdit] = useState(false)
    const toggleEdit = ()=>{
        setOpenEdit(openEdit === true ? false : true)   
    }
   
    
   
    
    const table = [
        "Avatar",
        "Name",
        "Email",
        "Phone",
        "Address",
        "Action"
    ]

    return (
        <div className='container-product'>
            <div className="container-products">
                    <div className={`total-count-icon lightblue`}
                    > 
                       <FontAwesomeIcon icon={faUser} className="icon"/>
                    </div>
                    <div className="container-product-title"> 
                    Users
                    </div>
                    <div className='flex space-between container-product-buttons '>
                        <div className='product-add' onClick={toggleActive}><div>Add new</div></div>
                        <div class="search-box">
                        <input type="text" class="input-search" placeholder="Type to Search..." />
                        </div>
                    </div>
                        <DashboardUserTable
                            table={table}
                            toggleEdit={toggleEdit}
                        />
                         {openCreate &&  <DashboardUserCreate
                            toggleActive={toggleActive}
                            user={user}
                        />}
                        {openEdit &&  <DashboardUserEdit
                            toggleEdit={toggleEdit}
                            user={user}
                        />}
            </div>
        </div>
    )
                        
}