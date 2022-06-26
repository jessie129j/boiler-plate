import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';

function LoginPage() {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // label 컴포넌트를 둔다.
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // prevent auto refresh

        // 입력된 값(state)를 body에 담는다.
        let body = {
            email: Email,
            password: Password
        }

        console.log("bttn is clicked: " + JSON.stringify(body))

        dispatch(loginUser(body)).then(res=>{
            if(res.payload.success){
                console.log('You are logined. userId: ',res.payload.userId);
                navigate('/');
            }
            else{
                alert(res.payload.message)
            }
        })

    }

    return (
        <div>
            <div className="page-header">
                <h1>LoginPage</h1>
            </div>
            <form className="form-login" onSubmit={onSubmitHandler}>
                <h2 className="form-login-heading">Welcome Login</h2>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} placeholder="Email address" /><br/>
                <label >Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password"/><br/>
                <button type="submit">
                    login
                </button>


                <p>Don't have an account? <a href="/register">Register</a>, it's free.</p>
            </form>
        </div>
    )
}

export default LoginPage