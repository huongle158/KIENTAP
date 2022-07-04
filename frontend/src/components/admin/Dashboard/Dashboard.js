import React,{useState,useEffect}  from 'react';
import classnames  from 'classnames'
import {Outlet} from 'react-router-dom'

import DashboardMenu from './DashboardMenu';
import '../../../App.css'
import '../../../Styles/DashBoard.css'

import { faEnvelope, faFileInvoice, faHome,  faShoppingBag, faUser,faTshirt,faBars,faSearch,faBell } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'




function Doashboard(){
    const menuItems =[
        {
            "id" : 1,
            "name": "Dashboard",
            "icon":faHome},
        {
            "id" : 2,
            "name": "Collections",
            "icon":faShoppingBag},
        {
            "id" : 3,
            "name": "Subscriber",
            "icon":faEnvelope},
        {
            "id" : 4,
            "name": "Orders",
            "icon":faFileInvoice },    
        {
            "id" : 5,
            "name": "Products",
            "icon":faTshirt},
        {
            "id" : 6,
            "name": "Users",
            "icon":faUser},
    ]
    const [tabId, setTabId] = useState("1");
    const setTabIdOnClick = (id) => {
        setTabId(id);
    }
    const [activeMenu, setActiveMenu] = useState(false)
    const toggleActive = ()=>{
        setActiveMenu(activeMenu === true ? false : true)   
    }
    const valueActive = {
            activeMenu,
            toggleActive
    } 
    return (
     
     <div className="container ">
      <div className="sidebar "> 
      <DashboardMenu 
            menuItems={menuItems}
            tabId={tabId}
            setTabIdOnClick = {setTabIdOnClick}
            valueActive  = {valueActive }
            />
        </div> 
        <div className={`content ${valueActive.activeMenu ? 'active' : ''}`}>
            <div className="navbar">
                <div className="navbar-left">
                   <div className="navbar-item"><FontAwesomeIcon onClick={valueActive.toggleActive} icon={faBars} style={{fontSize: '18px'}} className="icon"/></div>
                    <div className="navbar-item">Home</div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-item" >
                    <form className="navbar-form">
                       <div className="navbar-item"><input type="text"  placeholder='Search...' ></input></div> 
                        <div className="navbar-item">
                        <FontAwesomeIcon icon={faSearch} className="icon"/>
                         </div>
                    </form>
                    </div>
                    <div className="navbar-item">
                         <div className="navbar-item"> <FontAwesomeIcon icon={faBell} className="icon"/></div>   
                    </div>
                </div>
            </div>
            <div className="content-wrapper"><Outlet /></div>
        
        </div>

    </div> 
   
    )
}
export default Doashboard
