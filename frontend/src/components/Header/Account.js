import React, { useContext, useEffect, useState, useRef } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'
import {
    withRouter
} from 'react-router-dom'

import { UserContext } from '../../contexts/User'
import AccountInfo from './AccountInfo'
import useValidator from '../../hooks/useValidator'


function Account(props) {
    const {setUserInfoFunc} = useContext(UserContext);


    const [check, setCheck] = useState(false);
    const [tabID, setTabID] = useState(0);
    const [arrSuccess, setArrSuccess] = useState([]);
    const [arrErr, setArrErr] = useState([]);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);

    const handleOnChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const [validator, showValidationMessage] = useValidator()

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (validator.allValid()) {
            console.log("form submitted");
            if (tabID === 0) {
                Axios.post('http://localhost:5000/user/login', {
                    email: user.email,
                    password: user.password
                })
                    .then(res => {
                        localStorage.setItem('token', res.data.accessToken);
                        localStorage.setItem('user-id', res.data._id);
                        setArrSuccess(arrSuccess => [...arrSuccess, "Login success!"])
                        setTimeout(() => {
                            window.location.reload(false);
                            document.body.style.overflow = 'unset';
                        }, 1000)
                    })
                    .catch(err => {
                        setArrErr([err.response.data]);
                    })

            } else {
                Axios.post('http://localhost:5000/user/register', {
                    username: user.registerName,
                    email: user.registerEmail,
                    password: user.registerPassword
                })
                    .then(res => {
                        setArrSuccess(arrSuccess => [...arrSuccess, res.data])
                        setTimeout(() => {
                            window.location.reload(false);
                            document.body.style.overflow = 'unset';
                        }, 1000)
                    })
                    .catch(err => {
                        setArrErr(arrErr => [...arrErr, err.response.data]);
                    })
            }
        } else {
            // validator.showMessages();
            showValidationMessage(true);
        }


    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/user/${localStorage.getItem('user-id')}`, {
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                setUserInfoFunc(res.data.user);
                setLogin(true)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    let uniqueErr, uniqueSuccess = [];
    if (arrErr.length > 0) {
        uniqueErr = arrErr.filter(function (item, pos) {
            return arrErr.indexOf(item) === pos;
        })
    }
    if (arrSuccess.length > 0) {
        uniqueSuccess = arrSuccess.filter(function (item, pos) {
            return arrSuccess.indexOf(item) === pos;
        })
    }

    return (
        <div className={props.accountOpen === false ? 'Account displayNone' : 'Account'}>
            <div className="account-container">
                <div className="search-header flex">
                    <div className="search-title">My Account</div>
                    <div
                        className="search-close"
                        onClick={props.clickToClose}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="icon"
                        />
                    </div>
                </div >

                {login === true &&
                    <AccountInfo/>
                }

                {login === false &&
                    <div className={props.accountOpen === false ? '' : 'fadeIn'}>
                        <div
                            className='search-tab login-tab flex'>
                            <div
                                className={tabID === 0 ? 'search-tab-cate search-tab-active' : 'search-tab-cate'}
                                onClick={() => { setTabID(0); setArrErr([]); setArrSuccess([]) }}
                            >
                                Login
                            </div>
                            <div
                                className={tabID === 1 ? 'search-tab-cate search-tab-active' : 'search-tab-cate'}
                                onClick={() => { setTabID(1); setArrErr([]); setArrSuccess([]) }}
                            >
                                Register
                            </div>
                        </div>
                        <div className="login-err flex-center flex-col">
                            {uniqueErr &&
                                <div>
                                    {
                                        uniqueErr.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <FontAwesomeIcon icon={faTimes} style={{ marginRight: '10px', color: 'red' }} />
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {uniqueSuccess &&
                                <div >
                                    {
                                        uniqueSuccess.map((item, index) => {
                                            return (
                                                <div key={index} className="login-success">
                                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px', color: 'green' }} />
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        {tabID === 0 &&
                            <div className="search-form login-form fadeToRight">
                                <form className="flex-col" onSubmit={handleOnSubmit} >
                                    <input type="email" placeholder="Email" name="email" onChange={handleOnChange} />
                                    {validator.message('email', user.email, 'required|email',
                                        {
                                            messages: {
                                                email: 'Email is invalid',
                                                required: "Email is required"
                                            }
                                        })}

                                    <input type="password" placeholder="Password" name="password" onChange={handleOnChange} />
                                    {validator.message('password', user.password, 'required', {
                                        messages: {
                                            required: "Password is required"
                                        }
                                    })}

                                    <div className="remember-login flex noselect"
                                        onClick={() => {
                                            if (check) {
                                                setCheck(false)
                                            } else {
                                                setCheck(true)
                                            }
                                        }}
                                    >
                                        <div className="check-box"></div>
                                        {check &&
                                            <div className="check-box-active flex-center" onClick={() => setCheck(false)}>
                                                <FontAwesomeIcon className="check-box-active" icon={faCheck}></FontAwesomeIcon>
                                            </div>
                                        }
                                        <p>Remember me</p>
                                    </div>
                                    <button type="submit" onClick={handleOnSubmit} className="btn">LOGIN</button>
                                    <label>LOST YOUR PASSWORD?</label>
                                </form>
                            </div>
                        }
                        {tabID === 1 &&
                            <div className="search-form login-form fadeToLeft">
                                <form className="flex-col" onSubmit={handleOnSubmit}>
                                    <input type="text" placeholder="Name" name="registerName" onChange={handleOnChange} />
                                    {validator.message('email', user.registerName, 'required|min=3',
                                        {
                                            messages: {
                                                email: 'Name must be at least 3 characters',
                                                required: "Name is required"
                                            }
                                        })}
                                    <input type="email" placeholder="Email" name="registerEmail" onChange={handleOnChange} />
                                    {validator.message('email', user.registerEmail, 'required|email',
                                        {
                                            messages: {
                                                email: 'Email is invalid',
                                                required: "Email is required"
                                            }
                                        })}
                                    <input type="password" placeholder="Password" name="registerPassword" onChange={handleOnChange} />
                                    {validator.message('password', user.registerPassword, 'required', {
                                        messages: {
                                            required: "Password is required"
                                        }
                                    })}
                                    <button className="btn">REGISTER</button>
                                </form>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(Account);