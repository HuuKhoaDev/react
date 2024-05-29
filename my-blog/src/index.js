
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Blog from './component/blog/Blog';
import Detail from './component/blog/Detail';
import Login from './member/Login';
import Account from './member/Account';
import Home from './Home';

import Register from './member/Register'
import Evaluate from './component/blog/Evaluate';
import Comment from './component/blog/Comment';
import ListComment from './component/blog/ListComment';
import My_product from './member/My_product';
import Add_product from './member/Add_product';
import EditProduct from './member/Edit_product';
import Cart from './member/Cart';
import Product_detail from './member/Product_detail';







ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index  path='/home' element={<Home />} />
          <Route path='/blog/list' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={<Account />} />
          <Route path='/register' element={<Register />} />
          <Route path='/evaluate' element={<Evaluate />} />
          <Route path='/comment' element={<Comment />} />
          <Route path='/liscomment' element={<ListComment />} />
          <Route path='/myproduct' element={<My_product />} />
          <Route path='/add_product' element={<Add_product />} />
          <Route path='/product-edit/:id' element={<EditProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/detail/:id' element={<Product_detail />} />
         
          
        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();



