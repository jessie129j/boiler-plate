import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user);


    const buttonList = () => {
        if (user.isLogined) {
            return <>
                <a className="nav-link" onClick={() => { navigate('/profile') }}> [Profile] </a> |
                <a className="nav-link" onClick={() => { navigate('/') }}> [Comments] </a>
            </>
        }
        return <>
            <a className="nav-link" onClick={() => { navigate('/login') }}> [Login] </a> |
            <a className="nav-link" onClick={() => { navigate('/register') }}> [Register] </a>
        </>
    }

    return (
        <header className="header">
            <div className="container">
                <button type="button">Menu</button> |
                <a className="nav-link" onClick={() => { navigate('/') }}> [MVC App] </a> |
                {buttonList()}
            </div>
        </header>
    )
}

export default Header