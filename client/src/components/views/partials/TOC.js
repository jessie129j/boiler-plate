import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SERVER } from '../../config';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function TOC() {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [contents, setContents] = useState([])

    useEffect(() => {
        Axios.get(`${SERVER}/content/list`).then(res => {
            if (res.data.success) {
                setContents(res.data.contents)
                console.log(contents)
            }
            else {
                alert('api/content/list failed.')
            }
        })
    }, [])

    const buttonList = () => {
        if (user.isLogined) {
            return <div class="bt_wrap">
                <button onClick={() => { navigate('/content/create') }}> Create </button>
            </div>
        }
        return
    }

    const toc = () => {
        var list = [];
        // var data = this.props.data;
        contents.forEach((x) => {
            list.push(
                <div>
                    <div class="seq">{x.seq}</div>
                    <div class="title"><a onClick={() => { navigate('/content/read/' + x.seq) }}>{x.title}</a></div>
                    <div class="writer">{x.userId}</div>
                    <div class="date">{x.date}</div>
                </div>);
        })
        return list;
    }


    return (
        <div class="list_wrap">

            <div class="list">
                <div class="top">
                        <div class="seq">번호</div>
                        <div class="title">제목</div>
                        <div class="writer">글쓴이</div>
                        <div class="date">작성일</div>
                    </div>
                {contents !== [] && toc()}
            </div>


            {buttonList()}
            <div class="list_page">
                <a href="#" class="bt first">((</a>
                <a href="#" class="bt prev">(</a>
                <a href="#" class="num on">1</a>
                <a href="#" class="num 2">2</a>
                <a href="#" class="num 3">3</a>
                <a href="#" class="num 4">4</a>
                <a href="#" class="num 5">5</a>
                <a href="#" class="bt next">)</a>
                <a href="#" class="bt last">))</a>
            </div>
        </div>
    )
}

export default TOC