import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Admin.css'
import bg from '../../../assets/login-bg.jpg'
import Axios from 'axios'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'
import useValidator from '../../../hooks/useValidator'


function Login(props) {
    const [validator, showValidationMessage] = useValidator()

    const [arrSuccess, setArrSuccess] = useState([]);
    const [arrErr, setArrErr] = useState([]);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (localStorage.getItem('errLogin')) {
            setArrErr([localStorage.getItem('errLogin')]);
        }
        setTimeout(() => {
            localStorage.removeItem('errLogin')
            setArrErr([])
        }, 3000)
    }, [])

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (validator.allValid()) {
            console.log("form submitted");
            Axios.post('http://localhost:5000/user/login', {
                email: email,
                password: password
            })
                .then(res => {
                    if (res.data.admin) {
                        setArrSuccess(["Login success!"])
                        setArrErr([]);
                        localStorage.setItem('token', res.data.accessToken);
                        localStorage.setItem('user-id', res.data._id);
                        props.history.push('/admin/dashboard')
                    }
                    else {
                        setArrSuccess([]);
                        setArrErr(["You do not have Administrator access!"]);
                    }

                })
                .catch(err => {
                    console.log(err.response.data)
                    setArrErr([err.response.data]);
                    setArrSuccess([])
                })
        } else {
            // validator.showMessages();
            showValidationMessage(true);
        }
    }

    let uniqueErr, uniqueSuccess = [];
    if (arrErr.length > 0) {
        uniqueErr = arrErr.filter(function (item, pos) {
            return arrErr.indexOf(item) === pos;
        })
        // uniqueErr = arrErr
    }
    if (arrSuccess.length > 0) {
        uniqueSuccess = arrSuccess.filter(function (item, pos) {
            return arrSuccess.indexOf(item) === pos;
        })
    }

    return (
        <div className="Login">
            <img className="login-bg" src={bg} alt=""></img>
            <div className="login-overlay flex-center">
                <div className="login-box flex">
                    <div className="login-left flex-center flex-col">
                        <img src="https://demo.uix.store/sober/wp-content/themes/sober/images/logo.svg" alt="logo" width="50%"></img>
                        <div className="login-title">Login To Admin Dashboard</div>
                        <div className="login-err flex-center flex-col login-arr-admin"
                            style={{
                                width: '80%', padding: '0'
                            }}>
                            {uniqueErr &&
                                <div style={{ width: '100%', padding: '0' }}>
                                    {

                                        uniqueErr.map((item, index) => {
                                            return (
                                                <div key={index} style={{ color: 'red', fontStyle: 'italic' }}>
                                                    <FontAwesomeIcon icon={faTimes} style={{ marginRight: '10px' }} />
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {uniqueSuccess &&
                                <div style={{ width: '100%', padding: '0' }}>
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
                        <form className="admin-login-form flex-col" onSubmit={handleOnSubmit}>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                            {validator.message('email', email, 'required|email',
                                {
                                    messages: {
                                        email: 'Email is invalid',
                                        required: "Email is required"
                                    }
                                })}
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                            {validator.message('password', password, 'required', {
                                messages: {
                                    required: "Password is required"
                                }
                            })}
                            <button type="submit" className="btn">LOGIN</button>
                        </form>
                    </div>
                    <div className="login-right">
                        <div className="animation-overlay"></div>
                        <img src={bg} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login)