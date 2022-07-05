

import '../../../../Styles/DashboardMain/DBTopFive.css' 
import React from 'react'



import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



 function DashboardTopFive(props) {

    const data = props.data




    return(
        <div className="top-five">
            <div  className={`headerbox ${props.color}`}>
                <FontAwesomeIcon  icon={props.icon}  className="icon"/></div>
            <div className="top-five-title">
                {props.title}   
            </div>
            <div className="top-five-content">
                <div className="flex top-five-header">
                {props.table.map((item, index)=>{
                                    return (
                                        <div 
                                            key={index}
                                            >{item.title}</div>
                                    )
                                })
                            }
                   
                </div>
                
                {data.slice(0,5).map((item,index)=>{
                    
                   return(  
                   <div key={index}>
                    <div className="count-line"></div>
                   <div className="flex top-five-header">
                    
                        <div className="flex align-center">
                            <p><img src={item.productImg[1]} className="top-user-avt"></img></p>
                            <p>{item.productName}</p>
                        </div>
                        <div>
                            <p>{item.productSold}</p>
                        </div>
               </div>
               </div>)})} 
            </div>
            
         
            
        
    </div>

               
    )





 }


 export default DashboardTopFive
