

import {React,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

function ProductTable(props){

    const table = props.table
    const toggleEdit= props.toggleEdit
    const product = props.product

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
                            <td></td>
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
                        {product.map((item,index)=>{
                            return (
                                <tr key={index}>
                                        <td className='table-name'>{item.productName}</td>
                                        <td>
                                            <img 
                                                src=''
                                                style={ {width :'70px' ,height:"80px", padding:'5px 0px'}}
                                            />
                                        </td>
                                        <td>{item.productPrice}</td>
                                        <td><p>{item.productSale}</p></td>
                                        <td>{item.productSold}</td>
                                        <td>30/06/2022</td>
                                        <td>eqwew</td>
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
                            )})}
                </tbody>
            </table>
        </div>
    )

    
}
export default ProductTable