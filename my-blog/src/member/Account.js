


import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';


function Account() {
    const [getToken, setToken] = useState('');
    const [getId, setId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [errors, setErrors] = useState({});
    const [account, setAccount] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        level: 0
    });

    useEffect(() => {
        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            const loginData = JSON.parse(login);
            if (loginData && loginData.data) {
                setToken(loginData.data.token);
                setId(loginData.data.Auth.id);
                setAccount({
                    name: loginData.data.Auth.name,
                    email: loginData.data.Auth.email,
                    phone: loginData.data.Auth.phone,
                    address: loginData.data.Auth.address,
                    password: loginData.data.Auth.password,
                    level: loginData.data.Auth.level
                });
            }
        }
    }, []);

    const clearErrors = () => {
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        
        const newErrors = {};
        if (!account.name) newErrors.name = "Vui lòng nhập Tên";
        if (!account.email) newErrors.email = "Vui lòng nhập Email";
        if (!account.phone) newErrors.phone = "Vui lòng nhập Số điện thoại";
        if (!account.address) newErrors.address = "Vui lòng nhập Địa chỉ";
        if (!avatar) newErrors.avatar = "Vui lòng chọn ảnh đại diện";
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', account.name);
        formData.append('email', account.email);
        formData.append('password', account.password); 
        formData.append('phone', account.phone);
        formData.append('address', account.address);
        formData.append('avatar', avatar);
        formData.append('level', );

        const config = {
            headers: {
                'Authorization': 'Bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        try {
            const res = await api.post("user/update/" + getId, formData, config);
            alert("Update thành công");
            localStorage.setItem("isLoggedIn", JSON.stringify(res));
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error while updating user:', error.message);
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    return (
        <section>
            <div className="container">
            <div className="row">
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">
            {/*category-productsr*/}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link to="/edit-product ">Account</Link>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link to="/myproduct">My product</Link>
                </h4>
              </div>
            </div>
          </div>
          {/*/category-products*/}
        </div>
    </div>
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update User</h2>
                <div className="signup-form">
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" value={account.name} onChange={handleChange} />
                        {errors.name && <p className="error">{errors.name}</p>}
                        <input type="email" name="email" placeholder="Email Address" value={account.email} readOnly />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <input type="password" name="password" placeholder="Password" value="" onChange={handleChange} />
                        <input type="file" name="avatar" onChange={handleFileChange} />
                        {errors.avatar && <p className="error">{errors.avatar}</p>}
                        <input type="tel" name="phone" placeholder="Phone" value={account.phone} onChange={handleChange} />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                        <input type="text" name="address" placeholder="Address" value={account.address} onChange={handleChange} />
                        {errors.address && <p className="error">{errors.address}</p>}
                        <button type="submit" className="btn btn-default">Update</button>
                    </form>
                </div>
            </div>
           
        </div>
    </div>
</div>
        </section>
    );
}

export default Account;
