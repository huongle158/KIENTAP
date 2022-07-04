import {React,useState } from 'react';
import classNames  from 'classnames'
import { Link } from 'react-router-dom';
import '../../../Styles/DashBoard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown,faAngleUp,faIdCard,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'



 function DashboardMenu(props) {
    const valueActive =props.valueActive ;
    
    const menuItems = props.menuItems;
    const openMenu = props.openMenu;
    const openMenuMobile = props.openMenuMobile;
    const [openUserOpt, setOpenUserOpt] = useState(false)
    const clickToShowUserOpt = () => {
        if (openUserOpt) setOpenUserOpt(false);
        else setOpenUserOpt(true);
    }
    return (
        
        <div 
            className={`DashboardMenu ${valueActive.activeMenu ? 'active' : ''}`}
        >
            
             <div className="db-menu-overlay"></div>
             <div>
                <div className="db-menu-logo">
                    <div className="" style={{height: '24px', marginLeft: '12px'}}>
                        <p className="logo-text">SB</p>
                    </div>
                    <div><p>pro123</p></div>
                    <div className="menu-logo-close"><p><FontAwesomeIcon onClick={valueActive.toggleActive} icon={faSignOutAlt} style={{fontSize: '18px'}}/></p></div>
                   
                </div>        
                <div className="menu-line"></div>
                <div className="db-menu-user"
                    onClick={clickToShowUserOpt}
                >
                    <div>
                        <div className="db-menu-avt">
                            <img alt="loi~" src="https://i1.sndcdn.com/avatars-BaPhbPRs9zX6Mf3E-3ev9Eg-t500x500.jpg"></img>
                            <div className={`title ${valueActive.activeMenu ? 'active' : ''}`}>Uchiha Obito</div>
                            { openUserOpt === false && <FontAwesomeIcon icon={faAngleDown} style={{fontSize: '18px'}}/>}
                            {  openUserOpt === true && <FontAwesomeIcon icon={faAngleUp} style={{fontSize: '18px'}}/>}
                        </div>
                        <div className={openUserOpt ? "db-menu-user-opt closeOpt" : "db-menu-user-opt"}>
                            <div className="db-menu-item ">
                                <div> <FontAwesomeIcon icon={faIdCard} style={{fontSize: '18px'}} className="icon"/></div>
                                <div className={`title ${valueActive.activeMenu ? 'active' : ''}`}>Profile</div>
                            </div>
                            <div  className="db-menu-item">
                                <div><FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '18px'}} className="icon"/></div>
                                <div className={`title ${valueActive.activeMenu ? 'active' : ''}`}>Logout</div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="menu-line"></div>
                    <ul className={`${valueActive.activeMenu ? 'active' : ''}`}>  {
                        menuItems.map(menuItem =>(    
                        <Link  to={menuItem.name}> 
                        <li key={menuItem.id}  
                            className={classNames("db-menu-item flex-center", 
                            {db_menu_active: props.tabId === menuItem.id,})} 
                            onClick={()=>{props.setTabIdOnClick(menuItem.id);
                        }}>
                        <span 
                            className={"iconLogo "}>
                            <FontAwesomeIcon 
                            icon={menuItem.icon} 
                            style={{fontSize: '18px'}} 
                            className="icon"/>
                        </span>
                        <span className={`title ${valueActive.activeMenu ? 'active' : ''}`}>
                             {menuItem.name}
                        </span>
                        </li>
                        </Link>
                        )
                        )
                    }
                    </ul>
                    
                </div>
        </div>
    )
}
export default DashboardMenu