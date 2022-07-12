import React, { useEffect, useRef, useState } from 'react'
import DashboardCollectionTable from './DashboardCollectionTable'
import DashboardCollectionEdit from './DashboardCollectionEdit'
import DashboardCollectionCreate from './DashboardCollectionCreate'
import {faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

export default function DashboardCollection() {
            const [collection, setCollection] = useState([])
            const [isSortByName, setIsSortByName] = useState(false)
            const [constCollection, setConstCollection] = useState([])
            const table = [
              "Name",
              "Banner",
              "Items",
              "Date",
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
            <div className={`total-count-icon orange`}
             > 
               <FontAwesomeIcon icon={faShoppingBag} className="icon"/>
            </div>
            <div className="container-product-title"> 
               Collections
            </div>
            <div className='flex space-between container-product-buttons '>
                <div className='product-add' onClick={toggleActive}><div>Add new</div></div>
                <div class="search-box">
                        <input type="text" class="input-search" placeholder="Type to Search..." />
                        </div>
            </div>
      
                <DashboardCollectionTable 
                    table={table}
                    toggleEdit={toggleEdit}
                    collection={collection}
                />
           
          
            {openCreate &&  <DashboardCollectionCreate
                    toggleActive={toggleActive}
                    collection={collection}
                />}
                 {openEdit &&  <DashboardCollectionEdit
                    toggleEdit={toggleEdit}
                    collection={collection}
                />}
    </div>
    </div>

  )
}
