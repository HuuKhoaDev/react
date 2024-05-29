


import React, { useState } from 'react';
import { api } from '../api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [errors, setErrors] = useState({});

    const clearErrors = () => {
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!name) newErrors.name = "Vui lòng nhập Tên";
        if (!email) newErrors.email = "Vui lòng nhập Email";
        if (!password) newErrors.password = "Vui lòng nhập Password";
        if (!phone) newErrors.phone = "Vui lòng nhập Số điện thoại";
        if (!address) newErrors.address = "Vui lòng nhập Địa chỉ";
        if (!avatar) newErrors.avatar = "Vui lòng chọn ảnh đại diện";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('avatar', avatar);
        formData.append('level', 0);

        api.post("http://localhost/laravel8/laravel8/public/api/register", formData)
            .then((res) => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors);
                }
            })

    };

    const handleUseInputFile = (e) => {
        const file = e.target.files;
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(reader.result);
				
            };
            reader.readAsDataURL(file[0]);
            // console.log(avatar);
        }
    }

    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>New User Signup!</h2>
                <form encType='multipart/from-data' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <input type="file" placeholder="Avatar" onChange={handleUseInputFile} />
                    {errors.avatar && <p className="error">{errors.avatar}</p>}

                    <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {errors.phone && <p className="error">{errors.phone}</p>}

                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {errors.address && <p className="error">{errors.address}</p>}
					
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
