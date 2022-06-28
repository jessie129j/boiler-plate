import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../../../_actions/user_actions';
import img from '../../images/user.png'

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
        <div className="body_wrap">
            <div className="body_title">
                <strong>ProfilePage</strong>
            </div>
            <div className="datails">

                <div className="card">
                    <br />
                    <img className="card-img-top" src={img} />
                    <div className="card-block">
                        <strong className="card-title">User Details</strong>
                        <p className="card-text">
                            <strong>Name</strong>: {user.name} <br />
                        </p>
                        <div class="bt_wrap">
                        <button onClick={onClickHandler}>Logout</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage