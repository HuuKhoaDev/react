
function ListComment({ comments, onSelectComment }) {
  const getIdRep = (event) => {
    const id = event.target.id;
    // console.log("Comment ID:", id);
    onSelectComment(id);
  };
  

  return (
    <div className="response-area">
      <h2>{comments.length} RESPONSES</h2>
      <ul className="media-list">
        {comments.map((comment, index) => (
          <li className="media" key={index}>
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="http://localhost/laravel8/laravel8/public/upload/user/avatar/anh.jpg"
                alt=""
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  {comment.user ? comment.user.name : 'Nguyễn Khoa'}
                </li>
                <li>
                  <i className="fa fa-clock-o" />
                  {comment.time ? comment.time : "1:33 PM"} 
                </li>
                <li>
                  <i className="fa fa-calendar" />
                  {comment.date ? comment.date : "DEC 5, 201"}
                </li>
              </ul>
              <p>{comment.comment}</p>
              <a className="btn btn-primary" id={comment.id} onClick={getIdRep}>
                <i className="fa fa-reply" />
                Reply
              </a>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListComment;



