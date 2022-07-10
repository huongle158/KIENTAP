import {React,useState } from 'react';
import classNames  from 'classnames'
import { Link } from 'react-router-dom';
import '../../../Styles/Dashboard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown,faAngleUp,faIdCard,faSignOutAlt,faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'



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
            className={`DashboardMenu2 ${valueActive.activeMenu ? 'active' : ''}`}
            >
            
             <div className="db-menu-overlay"></div>
             <div>
                <div className="db-menu-logo2">
                    <div  style={{height: '24px', marginLeft: '12px'}}>
                        <p >SB</p>
                    </div>
                    <div><p>pro123</p></div>
                    <div className="menu-logo-close"><p><FontAwesomeIcon onClick={valueActive.toggleActive} icon={faArrowCircleLeft} style={{fontSize: '18px'}}/></p></div>
                   
                </div>        
                <div className="menu-line"></div>
                <div className="db-menu-user"
                    onClick={clickToShowUserOpt}
                >
                    <div>
                        <div className="db-menu-avt2">
                            <img alt="loi~" src="https://i1.sndcdn.com/avatars-BaPhbPRs9zX6Mf3E-3ev9Eg-t500x500.jpg"></img>
                            <div className={`title2 ${valueActive.activeMenu ? 'active' : ''}`}>Uchiha Obito</div>
                            { openUserOpt === false && <FontAwesomeIcon icon={faAngleDown} style={{fontSize: '18px'}}/>}
                            {  openUserOpt === true && <FontAwesomeIcon icon={faAngleUp} style={{fontSize: '18px'}}/>}
                        </div>
                        <div className={openUserOpt ? "db-menu-user-opt2 closeOpt2" : "db-menu-user-opt2"}>
                            <div className="db-menu-item2 space-evenly">
                                <div> <FontAwesomeIcon icon={faIdCard} style={{fontSize: '18px'}} className="icon"/></div>
                                <div className={`title2 ${valueActive.activeMenu ? 'active' : ''}`}>Profile</div>
                            </div>
                            <div  className="db-menu-item2 space-evenly">
                                <div><FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '18px'}} className="icon"/></div>
                                <div className={`title2 ${valueActive.activeMenu ? 'active' : ''}`}>Logout</div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="menu-line"></div>
                    <ul className={`${valueActive.activeMenu ? 'active' : ''}`}>
                        {menuItems.map(menuItem =>(    
                            <Link  to={menuItem.name}> 
                            <li key={menuItem.id}  
                                className={classNames("db-menu-item2 flex", 
                                {db_menu_active2: props.tabId === menuItem.id,})} 
                                 onClick={()=>{props.setTabIdOnClick(menuItem.id);
                            }}>
                        <span 
                            className={"iconLogo2"}>
                            <FontAwesomeIcon 
                            icon={menuItem.icon} 
                            style={{fontSize: '18px'}} 
                            />
                        </span>
                        <span className={`title2 ${valueActive.activeMenu ? 'active' : ''}`}>
                             {menuItem.name}
                        </span>
                        </li>
                        </Link>
                        ))}
                    </ul>
                    
                </div>
        </div>
    )
}
export default DashboardMenu