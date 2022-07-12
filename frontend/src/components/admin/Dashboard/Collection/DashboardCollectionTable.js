import React, { useEffect, useState } from 'react'

import '../../../../App.css'
import '../../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'

export default function DashboardCollectionTable(props) {
  const table = props.table
  const toggleEdit= props.toggleEdit
  const [collection, setCollection] = useState([])
    const [isSortByName, setIsSortByName] = useState(false)
    const [constCollection, setConstCollection] = useState([])
    
    useEffect(()=>{
        axios.get(`http://pe.heromc.net:4000/collection`)
            .then(res => {
                setCollection(res.data)
                setConstCollection(res.data)
            }
        )
    },[props.isChange]) 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const choosePage = (event) => {
        if (Number(event.target.id) === 0) {
            setCurrentPage(currentPage)
        } else if (Number(event.target.id) === -1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                setCurrentPage(1);
            }
        } else if (Number(event.target.id) === 999) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(Number(event.target.id))
        }
    }

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const current = collection.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(collection.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pages = [];

    if (pageNumbers.length > 3) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1, currentPage + 2 );
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
                pages.push(currentPage -1, currentPage, currentPage + 1);
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else {
                pages.push(currentPage - 2, currentPage - 1, currentPage);
            }
        }
    } else if (pageNumbers.length === 3) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1, currentPage + 2 );
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
                pages.push(currentPage -1, currentPage, currentPage + 1);
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else {
                pages.push(currentPage - 2, currentPage - 1, currentPage);
            }
        }
    } else if (pageNumbers.length === 2){
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1);
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage);
            }
        }
    } else {
        if (currentPage === 1) {
            pages.push(currentPage);
        }
    }

    const deleteOnClick = (event) => {
        axios.post(`http://pe.heromc.net:4000/collection/delete/:${event.target.id}`, {
            id: event.target.id
        })
        setCollection(collection.filter((item)=>{
            return item._id !== event.target.id
        }))
    }

    const searchOnSubmit = (event) =>{
        event.preventDefault()
    }
    const searchOnChange = (event) => {
        const searchInput = event.target.value
        const search = []
        for (let i in constCollection) {
            if ((constCollection[i].collectionName).toLowerCase().includes(searchInput)) {
                search.push(constCollection[i])
            }
        }
        setCollection(search)
    }

    const sortTable = (event) => {
        if (event.target.id === "CollectionName") {
            if (isSortByName) {
                const sortByName = [...collection]
                sortByName.sort(function(a, b) {
                    var collectionA = a.collectionName.toLowerCase();
                    var collectionB = b.collectionName.toLowerCase(); 
                    if(collectionA === collectionB) return 0; 
                    return collectionA > collectionB ? 1 : -1;
                })
                setIsSortByName(false)
                setCollection(sortByName)
            } else {
                const sortByName = [...collection]
                sortByName.sort(function(a, b) {
                    var collectionA = a.collectionName.toLowerCase();
                    var collectionB = b.collectionName.toLowerCase(); 
                    if(collectionA === collectionB) return 0; 
                    return collectionA < collectionB ? 1 : -1;
                })
                setIsSortByName(true)
                setCollection(sortByName)
            }
        }
    }
  return (
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
    <div className="pagination-container flex" style={{ justifyContent: 'flex-end', margin: '20px 0'}}>
                        <div className="pagnigation flex-center" onClick={choosePage}>
                            <div id="-1" className={classNames({
                                pagnigation_disable: currentPage === 1
                            })}>←</div>
                            { pages.map(function(number, index) { 
                                if (currentPage === number) {
                                    return (
                                        <div key={number} id={number} className="pagnigation-active">
                                            {number}
                                        </div>
                                    )
                                } else {
                                    return (
                                    <div 
                                        key={number}
                                        id={number}
                                        >
                                            {number}
                                    </div>
                                    )
                                }
                            })}
                            <div id="999" className={classNames({
                                pagnigation_disable: currentPage === pageNumbers.length
                            })}>→</div>
                        </div>
                    </div>
</div>
  )
}
