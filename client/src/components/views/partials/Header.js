import React from 'react'

function Header() {
    return (
        <header className="header">
            <div className="container">
                <button type="button">Menu</button> |
                <a className="navbar-brand" href="/">MVC App</a> |
                <a className="nav-link" href="/login">Login</a> |
                <a className="nav-link" href="/register">Register</a> |
                <a className="nav-link" href="/profile">Profile</a> |
                <a className="nav-link" href="/comments">Comments</a>
            </div>
        </header>
    )
}

export default Header