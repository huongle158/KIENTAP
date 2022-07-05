import {React,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../../../Styles/DashboardProducts/DashboardProduct.css'  
function OrderTable(props){
    const table = props.table
    const toggleEdit= props.toggleEdit
    return(
        <div className="product-table scroll-inner">
            <table>
                <thead>
                        <tr>
                        {table.map((item, index) =>{
                            return(
                                <th key={index}>{item}</th>
                            )
                        })}
                        </tr>
                </thead>
                <tbody>
                        <tr>
                            <td className='table-name'>Phu pro 123</td>
                            <td>
                                <img 
                                    src=''
                                    style={ {width :'70px' ,height:"80px", padding:'5px 0px'}}
                                />
                            </td>
                            <td>700.000</td>
                            <td><p>No sale</p></td>
                            <td>4</td>
                            <td>30/06/2022</td>
                            <td style={{width:'40px'}}>
                                <div className="flex space-around">
                                                        <div  className="action-item  action-green" 
                                                              onClick={toggleEdit}
                                                            >
                                                                <span class="tooltip">Edit</span>
                                                            <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faPencilAlt}/>
                                                        </div>
                                                        <div  className="action-item  action-red"
                                                            >
                                                                <span class="tooltip">Delete</span>
                                                            <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                                                        </div>
                                                        </div>
                            </td>
                        </tr>
                        
                </tbody>
            </table>
        </div>

    )
}
export default OrderTable