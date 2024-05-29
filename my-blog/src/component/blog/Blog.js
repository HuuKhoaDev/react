

import React, { useState, useEffect } from 'react';
import BlogList from './BlogList'; 
import { api } from '../../api';

function Blog(props) {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    api.get('http://localhost/laravel8/laravel8/public/api/blog')
      .then(res => {
        setBlogPosts(res.data.blog.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <BlogList blogPosts={blogPosts} />
  );
}

export default Blog;




