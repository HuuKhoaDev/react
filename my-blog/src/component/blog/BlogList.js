


import React from 'react';
import { Link } from 'react-router-dom';



function Bloglist({ blogPosts }) {
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {blogPosts.map(post => (
          <div className="single-blog-post" key={post.id}>
            <h3>{post.title}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user" /> Mac Doe</li>
                <li><i className="fa fa-clock-o" /> {post.created_at}</li>
                <li><i className="fa fa-calendar" /> {post.updated_at}</li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <img src={`http://localhost/laravel8/laravel8/public/upload/Blog/image/${post.image}`} alt="" />
            <p>{post.description}</p>
            <Link className="btn btn-primary" to={`/blog/detail/${post.id}`}>Read More</Link>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Bloglist;


