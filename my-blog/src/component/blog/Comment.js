

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import ListComment from "./ListComment"; 

function Comment(props) {
  const params = useParams();

  const [input, setInput] = useState({
    message: ""
  });

  const [comments, setComments] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = JSON.parse(localStorage.getItem('isLoggedIn'));

    if (!login) {
      alert('Vui lòng đăng nhập để bình luận.');
      return;
    }

    if (!input.message) {
      alert('Vui lòng nhập bình luận.');
      return;
    }

    const formData = new FormData();
    formData.append('id_blog', params.id);
    formData.append('id_user', login.data.Auth.id);
    formData.append('id_comment',props.selectedCommentId ? props.selectedCommentId : 0);
    formData.append('comment', input.message);
    formData.append('name_user', login.data.Auth.name);
    formData.append('image_user', login.data.Auth.avatar);

    const config = {
      headers: {
        'Authorization': 'Bearer ' + login.data.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'  
      }
    };

    api.post('blog/comment/id' + params.id, formData, config)
      .then(response => {
        console.log(response.data);
        props.getCmt(response.data.data); 
        setInput({ message: "" });
      })  
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a reply</h2>
          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <form onSubmit={handleSubmit}>
              <textarea name="message" rows={11} value={input.message} onChange={handleInput} />
              <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
          </div>
        </div>
      </div>
      <ListComment comments={comments} />
    
    </div>
  );
}

export default Comment;


