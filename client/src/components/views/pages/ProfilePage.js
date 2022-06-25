import React from 'react'
import Axios from 'axios';
import { SERVER } from '../../config';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate=useNavigate()

    const onClickHandler = (event) => {
        event.preventDefault(); // prevent auto refresh
        console.log("bttn is clicked")

        Axios.get(`${SERVER}/user/logout`).then(res=>{
            if(res.data.success){
                console.log('You are logouted');
                navigate('/');
            }
            else{
                alert(res.data.message)
            }
        })
      }

    return (
        <div className="container">
            <div className="page-header">
                <h1>ProfilePage</h1>
            </div>
            <div className="datails">

                <div className="card">
                    <br />
                    <img className="card-img-top" src="imgsrc" alt="Card image cap" />
                    <div className="card-block">
                        <h4 className="card-title">User Details</h4>
                        <p className="card-text">
                            <strong>Name</strong>: userName<br />
                            <strong>Email</strong>: userEmail
                        </p>
                        <button onClick={onClickHandler}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage