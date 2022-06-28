import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../../_actions/user_actions';

function RegisterPage() {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // label 컴포넌트를 둔다.
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
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
            name:Name,
            email: Email,
            password: Password
        }

        console.log("bttn is clicked: " + JSON.stringify(body))

        dispatch(registerUser(body)).then(res=>{
            if(res.payload.success){
                console.log('You are registered. userId: ',res.data.userId);
                dispatch(loginUser(body)).then(res=>{
                    if(res.payload.success){
                        console.log('You are logined. userId: ',res.data.userId);
                        navigate('/');
                    }
                    else{
                        alert(res.payload.message)
                    }
                })
        
            }
            else{
                alert(res.payload.message)
            }
        })
    }

    return (
        <div className="body_wrap">
            <div className="body_title">
            <strong>RegisterPage</strong>
                <p>Welcome Register</p>
            </div>
            <form className="form-register" onSubmit={onSubmitHandler}>
                <label>Name</label>
                <input type="name" value={Name} onChange={onNameHandler} placeholder="Name" /><br/>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} placeholder="Email address" /><br/>
                <label >Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password"/><br />
                <div class="bt_wrap">
                    <button type="submit">
                        Register
                    </button>
                </div>


                <p>Don't have an account? <a href="/login">Login</a>, it's free.</p>
            </form>
        </div>
    )
}

export default RegisterPage