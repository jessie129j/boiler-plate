import {React,useEffect} from 'react'
import Axios from 'axios';
import { SERVER } from '../../config';
import { useSelector } from 'react-redux';

function LandingPage() {

  const user=useSelector(state=>state.user);

  useEffect(()=>{
    const variables={
        "message": "message from LandingPage"
    }
    Axios.post(`${SERVER}/test/test1`,variables).then(res=>{
        if(res.data.success){
            console.log(res.data.message);
        }
        else{
            alert('api/test/test1 failed.')
        }
    })
},[])

  return (
    <div>
      <div className="page-header">
                <h1>LandingPage</h1>
            </div>
            <p>
              Hello, {user.id}!
            </p>
    </div>
  )
}

export default LandingPage