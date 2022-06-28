import { Axios } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createContent } from '../../../_actions/content_actions';

function CreatePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user);

  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")

  // label 컴포넌트를 둔다.
  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value)
  }
  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent auto refresh

    if (Title == '') {
      return alert('Title is empty!')
    }
    if (Description == '') {
      return alert('Description is empty!')
    }


    // 입력된 값(state)를 body에 담는다.
    let body = {
      title: Title,
      description: Description,
      userId: user.id
    }

    console.log("bttn is clicked: " + JSON.stringify(body))

    dispatch(createContent(body)).then(res => {
      if (res.payload.success) {
        console.log(JSON.stringify(res.payload))
        navigate(`/content/read/${res.payload.contentInfo.seq}`);
      }
      else {
        alert(res.payload.message)
      }
    })

  }

  return (
    <div class="body_wrap">
      <div className="body_title">
        <strong>CreatePage</strong>
        <p>Welcome </p>
      </div>

      <form className="form-create" onSubmit={onSubmitHandler}>
        <div class="content_view">
          <div class="title">
          <label>Title</label><br/>
          <input type="text" value={Title} onChange={onTitleHandler} placeholder="Title" />
          </div>
         
          <div class="cont">

          <label>Description</label><br />
          <input type="text" value={Description} onChange={onDescriptionHandler} placeholder="Description" />
          </div>
        </div>
        <div class="bt_wrap">
                    <button type="submit">
                        Create
                    </button>
                </div>

      </form>
    </div>
  )
}

export default CreatePage