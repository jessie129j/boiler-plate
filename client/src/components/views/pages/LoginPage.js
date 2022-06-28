import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

        dispatch(loginUser(body)).then(res => {
            if (res.payload.success) {
                console.log('You are logined. userId: ', res.payload.userId);
                navigate('/');
            }
            else {
                alert(res.payload.message)
            }
        })

    }

    return (
        <div class="body_wrap">
            <div className="body_title">
                <strong>LoginPage</strong>
                <p>Welcome Login</p>
            </div>
            <form className="form-login" onSubmit={onSubmitHandler}>
                <label>Email</label><br />
                <input type="email" value={Email} onChange={onEmailHandler} placeholder="Email address" /><br />
                <label>Password</label><br />
                <input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" /><br />

                <div class="bt_wrap">
                    <button type="submit">
                        login
                    </button>
                </div>

                <p>Don't have an account? <a href="/register">Register</a>, it's free.</p>
            </form>
        </div>
    )
}

export default LoginPage