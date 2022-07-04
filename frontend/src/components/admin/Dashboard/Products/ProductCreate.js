

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function ProductCreate (props){

    const cateInput = useRef();
    const groupCateInput = useRef();
    const product= props.product;
    const [isCheckedSmall, setIsCheckedSmall] = useState(false);
    const [isCheckedMedium, setIsCheckedMedium] = useState(false);
    const [isCheckedLarge, setIsCheckedLarge] = useState(false);
    const [inputValue, setInputValue] = useState([])
    const [cate, setCate] = useState([])
    const [file, setFile] = useState([])

    const [productImg, setProductImg] = useState([])
    const [productName, setProductName] = useState("")
    const [productSale, setProductSale] = useState(0)
    const [productPrice, setProductPrice] = useState(0)
    const [productDes, setProductDes] = useState("")
    const [productCate, setProductCate] = useState("")
    const [productGroupCate, setProductGroupCate] = useState("")
    const [productGroupCateList, setProductGroupCateList] = useState([])
    const [productSize, setProductSize] = useState([])
    const [productSex, setProductSex] = useState([])

    const handleOnChange = (event) => {
        setInputValue({...inputValue, [event.target.name]: event.target.value})
    }
    const checkedSize = (event) => {
        if (event.target.id === "1") {
            if (isCheckedSmall) {
                const size = productSize.filter((item)=> {
                    return item !== 'Small'
                })
                setProductSize(size)
                setIsCheckedSmall(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === "2") {
            if (isCheckedMedium) {
                const size = productSize.filter((item)=> {
                    return item !== 'Medium'
                })
                setProductSize(size)
                setIsCheckedMedium(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === "3") {
            const size = productSize.filter((item)=> {
                return item !== 'Large'
            })
            setProductSize(size)
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setProductSize(productSize=>[...productSize, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }
    const addNewCate = () => {
        axios.post('', {
            cateName: inputValue.cate
        })
        setCate(cate=>[...cate, {cateName: inputValue.cate}])
        setProductCate(inputValue.cate)
        cateInput.current.value = ""
    }
 
    const addNewGroupCate = () => {
        setProductGroupCate(inputValue.groupCate)
        setProductGroupCateList(productGroupCateList => [...productGroupCateList, {productGroupCate: inputValue.groupCate}])
        groupCateInput.current.value = ""
    } 

    const deleteImg = (event) => {
        const id = event.target.id
        const virutalFile = [...file]
        virutalFile.splice(id, 1)
        setFile(virutalFile)

        const items = [...productImg]
        items.splice(id, 1)
        setProductImg(items)
        axios.post(``, {
            deleteImgId: id
        })
    }
    return(
        <div className="DashboardProductInfo">
            <div className="create-box scroll-inner">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Product infomation
                    </div>
                    <div 
                        className="create-box-title-close"
                      onClick={props.toggleActive}  
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form  >
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Name</div>
                            <div className="dashboard-right">
                                <input 
                                    type="text" name="name" 
                                    onChange={(event)=>{
                                        setProductName(event.target.value)
                                    }} required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Images </div>
                            <div className="dashboard-right">
                                <input 
                                    onChange={(event) => {
                                        const files = event.target.files;
                                        for (let i = 0; i< files.length; i++) {
                                            setProductImg(product=>[...product, URL.createObjectURL(files[i])])
                                        }
                                        const fileArr = Array.prototype.slice.call(files)
                                        fileArr.forEach(item=>{
                                            setFile(file=>[...file, item])
                                        })
                                    }}
                                    type="file"
                                    name="productImg"
                                    className="noborder"
                                    multiple="multiple"
                                    style={{height: '50px'}}
                                ></input>
                                <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                    { productImg && 
                                        productImg.map((item, index) => {
                                            return (
                                                <div className="create-box-img">
                                                    <img key={index} src={item} alt=""></img>
                                                    <div 
                                                        className="create-box-img-overlay"
                                                    >
                                                        <p
                                                            id={index}
                                                            onClick={deleteImg}
                                                            className="icon">X
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Defaut price </div>
                            <div className="dashboard-right">
                                <input 
                                    type="number" name="price" 
                                    placeholder="USD" 
                                    onChange={(event)=>{
                                        setProductPrice(event.target.value)
                                    }} required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Sale off </div>
                            <div className="dashboard-right flex">
                                <input 
                                    type="number" placeholder="%" 
                                    style={{ width: "100px"}} 
                                    name="sale" 
                                    onChange={(event)=>{
                                        setProductSale(event.target.value)
                                    }}
                                    required></input>
                                <label>From: </label>
                                <input type="date"  name="fromdate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                                <label>To: </label>
                                <input type="date"  name="todate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Category group</div>
                            <div className="dashboard-right flex">
                                <select style={{ width: "350px"}} 
                                    onChange={(event) => {setProductGroupCate(event.target.value)}}
                                >
                                    <option></option>
                                    { productGroupCateList.length > 0 &&
                                        productGroupCateList.map((item, index) => {
                                            if (item.productGroupCate) {
                                                return(
                                                    <option key={index}>{item.productGroupCate}</option>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </select>
                                <input type="text" name="groupCate" placeholder="New category group?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={groupCateInput}></input>
                                <div className="btn" style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px'
                                }}
                                onClick={addNewGroupCate}>
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Category </div>
                            <div className="dashboard-right flex">
                                <select style={{ width: "350px"}} 
                                    onChange={(event) => {setProductCate(event.target.value)}}
                                >
                                    <option></option>
                                    { cate.length > 0 &&
                                        cate.map((item, index) => {
                                            return(
                                                <option key={index}>{item.cateName}</option>
                                            )
                                        })
                                    }
                                </select>
                                <input type="text" name="cate" placeholder="New category?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={cateInput}></input>
                                <div className="btn" style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px'
                                }}
                                onClick={addNewCate}>
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Sex </div>
                            <div className="dashboard-right flex">
                                <select style={{ width: "200px"}} 
                                    onChange={(event) => {setProductSex(event.target.value)}}
                                    required>
                                    <option></option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                </select>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Size </div>
                            <div className="dashboard-right flex">
                                <div 
                                    className={isCheckedSmall ? "size-check isChecked" : "size-check"}
                                    id="1" 
                                    onClick={checkedSize}>Small</div>
                                <div 
                                    className={isCheckedMedium ? "size-check isChecked" : "size-check"}
                                    id="2" 
                                    onClick={checkedSize}>Medium</div>
                                <div 
                                    className={isCheckedLarge ? "size-check isChecked" : "size-check"}
                                    id="3" 
                                    onClick={checkedSize}>Large</div>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Description </div>
                            <div className="dashboard-right">
                                <input 
                                    type="text" 
                                    name="des" 
                                    onChange={(event)=>{
                                        setProductDes(event.target.value)
                                    }}required></input>
                            </div>
                        </div>

                        <div className="flex" style={{marginTop: '40px'}}>
                            <button className="create-box-btn btn">
                                Create product
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    )

}

export default ProductCreate