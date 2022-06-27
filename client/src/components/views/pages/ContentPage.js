import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { deleteContent, readContent } from '../../../_actions/content_actions';

function ContentPage() {
    const params = useParams();
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const user = useSelector(state => state.user);

    const [content, setContent] = useState(null)

    const onClickDeleteListener=()=>{
        alert('Do you really want to delete?')
        let body = {
            seq: params.seq,
        }

        dispatch(deleteContent(body)).then(res=>{
            if(res.payload.success){
                alert('delted!')
                navigate('/')
            }
            else{
                alert(res.payload.message)
            }
        })
    }

    const buttonList = () => {
        if (user.isLogined&&content.userId==user.id) {
            return <>
                <button onClick={() => { navigate(`/content/update/${content.seq}`) }}> Update </button>
                <button onClick={onClickDeleteListener}> Delete </button>
            </>
        }
        return 
    }

    useEffect(() => {

        let body = {
            seq: params.seq,
        }

        dispatch(readContent(body)).then(res=>{
            if(res.payload.success){
                setContent(res.payload.contentInfo)
            }
            else{
                alert('invalid access!')
                navigate('/')
            }
        })

    }, [params])

    const getContent = () => {
        console.log(JSON.stringify(content))
        return <div>
            <h2>{content.title}</h2>
            <p>written by <b>{content.userId}</b>, {content.date}</p>
            <p>{content.description}</p>
        </div>
    }

    return (
        <div>
            {content !== null && getContent()}
            {content !== null && buttonList()}
        </div>

    )
}

export default ContentPage