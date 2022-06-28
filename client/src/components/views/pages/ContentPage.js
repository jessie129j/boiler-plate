import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContent, readContent } from '../../../_actions/content_actions';

function ContentPage() {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [content, setContent] = useState(null)

    const onClickDeleteListener = () => {
        alert('Do you really want to delete?')
        let body = {
            seq: params.seq,
        }

        dispatch(deleteContent(body)).then(res => {
            if (res.payload.success) {
                alert('delted!')
                navigate('/')
            }
            else {
                alert(res.payload.message)
            }
        })
    }

    const buttonList = () => {
        if (user.isLogined && content.userId == user.id) {
            return <div class="bt_wrap">
                <button onClick={() => { navigate(`/content/update/${content.seq}`) }}> Update </button>
                <button onClick={onClickDeleteListener}> Delete </button>
            </div>
        }
        return
    }

    useEffect(() => {

        let body = {
            seq: params.seq,
        }

        dispatch(readContent(body)).then(res => {
            if (res.payload.success) {
                setContent(res.payload.contentInfo)
            }
            else {
                alert('invalid access!')
                navigate('/')
            }
        })

    }, [params])

    const getContent = () => {
        console.log(JSON.stringify(content))
        return <div class="content_view">
            <div class="title">{content.title}</div>
            <div class="info">
                <dl>
                    <dt>번호</dt>
                    <dd>{content.seq}</dd>
                </dl>
                <dl>
                    <dt>글쓴이</dt>
                    <dd>{content.userId}</dd>
                </dl>
                <dl>
                    <dt>작성일</dt>
                    <dd>{content.date}</dd>
                </dl>
            </div>
            <div class="cont">{content.description}</div>
        </div>
    }

    return (
        <div class="body_wrap">
            <div class="content_view_wrap">
                {content !== null && getContent()}
                {content !== null && buttonList()}
            </div>
        </div>


    )
}

export default ContentPage