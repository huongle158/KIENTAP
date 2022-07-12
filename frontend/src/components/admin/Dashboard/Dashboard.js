import React,{useState,useEffect}  from 'react';
import classnames  from 'classnames'
import {Outlet} from 'react-router-dom'
import '../../../Styles/Dashboard.css'
import DashboardMenu from './DashboardMenu';
import '../../../App.css'
import '../../../Styles/Dashboard.css'

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
      <div className="sidebar1 "> 
      <DashboardMenu 
            menuItems={menuItems}
            tabId={tabId}
            setTabIdOnClick = {setTabIdOnClick}
            valueActive  = {valueActive }
            />
        </div> 
        <div className={`content2 ${valueActive.activeMenu ? 'active' : ''}`}>
            <div className="navbar2">
                <div className="flex">
                   <div className="navbar-item2"><FontAwesomeIcon onClick={valueActive.toggleActive} icon={faBars} style={{fontSize: '18px'}} /></div>
                    <div className="navbar-item2">Home</div>
                </div>
                <div className="flex">
                    <div className="navbar-item2" >
                    <form className="navbar-form2">
                       <div className="navbar-item2"><input type="text"  placeholder='Search...' ></input></div> 
                        <div className="navbar-item2">
                        <FontAwesomeIcon icon={faSearch} />
                         </div>
                    </form>
                    </div>
                    <div className="navbar-item2">
                         <div className="navbar-item2"> <FontAwesomeIcon icon={faBell} className="icon"/></div>   
                    </div>
                </div>
            </div>
            <div className="content-wrapper"><Outlet /></div>
        
        </div>

    </div> 
   
    )
}
export default Doashboard
