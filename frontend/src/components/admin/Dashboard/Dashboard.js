import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import DashboardBody from './DashboardBody'
import DashboardMenu from './DashboardMenu'
import { faEnvelope, faFileInvoice, faHome, faInbox, faNewspaper, faShoppingBag, faTshirt, faUser } from '@fortawesome/free-solid-svg-icons'

import socketIOClient from "socket.io-client"
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
const ENDPOINT = "http://localhost:5000";

function Dashboard(props) {
    const menuItems = [
        {
            id: "1",
            name: "Dashboard",
            icon: faHome
        },
        {
            id: "3",
            name: "Orders",
            icon: faFileInvoice
        },
        {
            id: "4",
            name: "Products",
            icon: faTshirt
        },
      
        {
            id: "6",
            name: "Users",
            icon: faUser
        },
        {
            id: "2",
            name: "Collection",
            icon: faShoppingBag
        },
        {
            id: "5",
            name: "Subscribers",
            icon: faEnvelope
        },
    ]
    const [tabId, setTabId] = useState("1");
    const [openMenu, setOpenMenu] = useState(true);
    const [openMenuMobile, setOpenMenuMobile] = useState(true);
    const [productId, setProductId] = useState("")

    const socket = socketIOClient(ENDPOINT);

    const [orderNotice, setOrderNotice] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

        // `http://localhost:5000/user/${localStorage.getItem('user-id')}`
    useEffect(() => {
        if (localStorage.getItem('token')) {
            Axios.get(`http://localhost:5000/user/${localStorage.getItem('user-id')}`, {
                headers: { "token": `Bearer ${localStorage.getItem('token')}` }
            })
                .then(res => {
                    // console.log(res.data)
                    setUserInfo(res.data)
                    const userInfo = res.data;
                    if (userInfo.admin === true) {
                        socket.emit('join', {
                            sessionId: 'admin',
                            isAdmin: true
                        })
                        socket.on("placeAnOrder-notice", function (data) {
                            setOrderNotice(data)
                        })
                    } else {
                        localStorage.setItem("errLogin", "You do not have Administrator access!")
                        props.history.push('/admin')
                    }
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } else {
            props.history.push('/admin')
        }
    }, [])

    const setTabIdOnClick = (id) => {
        setTabId(id);
    }

    const setOpenMenuOnClick = () => {
        if (window.innerWidth <= 1110) {
            setOpenMenu(true);
            if (openMenuMobile) setOpenMenuMobile(false);
            else setOpenMenuMobile(true);
        } else {
            if (openMenu) setOpenMenu(false);
            else setOpenMenu(true);
        }
    }

    const [openCreate, setOpenCreate] = useState(false)

    const setOpenCreateFunc = () => {
        document.body.style.overflow = 'hidden';
        setOpenCreate(true)
    }

    const setCloseCreateFunc = (bool) => {
        document.body.style.overflow = 'unset';
        setOpenCreate(bool)
    }

    const [openEdit, setOpenEdit] = useState(false)

    const setOpenEditFunc = (event) => {
        document.body.style.overflow = 'hidden';
        setOpenEdit(true)
        setProductId(event.target.id)
    }

    const setCloseEditFunc = (bool) => {
        document.body.style.overflow = 'unset';
        setOpenEdit(bool)
    }

    return (
        <div className="Dashboard flex">
            <DashboardMenu
                setTabIdOnClick={setTabIdOnClick}
                setOpenMenuOnClick={setOpenMenuOnClick}
                tabId={tabId}
                menuItems={menuItems}
                openMenu={openMenu}
                openMenuMobile={openMenuMobile}
                setCloseCreateFunc={setCloseCreateFunc}
                setCloseEditFunc={setCloseEditFunc}
                userInfo={userInfo}
            />
            <DashboardBody
                tabId={tabId}
                menuItems={menuItems}
                openMenu={openMenu}
                openMenuMobile={openMenuMobile}
                openCreate={openCreate}
                openEdit={openEdit}
                setOpenMenuOnClick={setOpenMenuOnClick}
                setOpenCreateFunc={setOpenCreateFunc}
                setCloseCreateFunc={setCloseCreateFunc}
                setOpenEditFunc={setOpenEditFunc}
                setCloseEditFunc={setCloseEditFunc}
                productId={productId}
                orderNotice={orderNotice}
            />
        </div>
    )
}
export default withRouter(Dashboard)