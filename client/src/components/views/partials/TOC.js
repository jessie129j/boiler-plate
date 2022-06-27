import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SERVER } from '../../config';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function TOC() {

    const navigate=useNavigate();
    const user = useSelector(state => state.user);
    
    const [contents, setContents] = useState([])

    useEffect(()=>{
        Axios.get(`${SERVER}/content/list`).then(res=>{
            if(res.data.success){
                setContents(res.data.contents)
                console.log(contents)
            }
            else{
                alert('api/content/list failed.')
            }
        })
    },[])

    const buttonList = () => {
        if (user.isLogined) {
            return <>
                <button onClick={() => { navigate('/content/create') }}> Create </button>
            </>
        }
        return 
    }

    const toc = () => {
        var list = [];
        // var data = this.props.data;
        contents.forEach((x) => {
            list.push(<li key={x.seq}> <a onClick={()=>{navigate('/content/read/'+x.seq)}}>{x.title}</a></li>);
        })
        return list;
    }


    return (
        <nav>
            <ul>
                {contents!==[]&&toc()}
            </ul>
            {buttonList()}
        </nav>
    )
}

export default TOC