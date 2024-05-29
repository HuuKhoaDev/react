

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { api } from '../../api';
import Evaluate from './Evaluate';
import ListComment from './ListComment';
import Comment from './Comment';

function Detail(props) {
  const params = useParams();
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState([]);
  const [cmt, setCmt] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState("");
  
  
  const handleCommentId = (commentId) => {
    // console.log("Comment ID:", commentId);
    setSelectedCommentId(commentId); 
  };
  
  
  useEffect(() => {
    api.get('blog/detail/' + params.id)
      .then(response => {
        console.log(response);
        setPostData(response.data.data);
        setComment(response.data.data.comment);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function getCmt(data) {
    const updated = cmt.concat(data);
    setCmt(updated);
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        <div className="single-blog-post">
          {postData && (
            <>
              <h3>{postData.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> {postData.author}</li>
                  <li><i className="fa fa-clock-o" /> {postData.created_at}</li>
                  <li><i className="fa fa-calendar" /> {postData.updated_at}</li>
                </ul> 
              </div>
              <img src={`http://localhost/laravel8/laravel8/public/upload/Blog/image/${postData.image}`} alt="" />
              <div dangerouslySetInnerHTML={{ __html: postData.content }} />
              <Evaluate />
              <ListComment comments={cmt} onSelectComment={handleCommentId} />
              <Comment idBlog={postData.id} getCmt={getCmt} selectedCommentId={selectedCommentId}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
