import {React,useEffect} from 'react'
import Axios from 'axios';
import { SERVER } from '../../config';

function LandingPage() {

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
    <div>LandingPage</div>
  )
}

export default LandingPage