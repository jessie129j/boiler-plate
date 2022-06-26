import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../../../_actions/user_actions';

function ProfilePage() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user);

    const onClickHandler = (event) => {
        event.preventDefault(); // prevent auto refresh
        console.log("bttn is clicked")

   
        dispatch(logoutUser()).then(res=>
            {
                if(res.payload.success){
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
                            <strong>Name</strong>: {user.id} <br />
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