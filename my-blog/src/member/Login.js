


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function Login(props) {
    const [input, setInput] = useState({
        email: "",
        pass: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput(state => ({ ...state, [nameInput]: valueInput }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorSubmit = {};
    
        if (input.email === "") {
            errorSubmit.email = "Vui lòng nhập email";
        }
        if (input.pass === "") {
            errorSubmit.pass = "Vui lòng nhập pass";
        }

        if (Object.keys(errorSubmit).length === 0) {
            const data = {
                email: input.email,
                password: input.pass,
                level: 0
            };

            api.post('login', data)
                .then(response => {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                        console.log(response);
                    } else {
                        const login = JSON.stringify(response)
                        localStorage.setItem('isLoggedIn', login);
                        alert("Đăng nhập thành công");
                        navigate('/home');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setErrors(errorSubmit);
        }
    };

    function renderError(inputName) {
        if (errors[inputName]) {
            return <li>{errors[inputName]}</li>;
        }
    }

    return (
        <div className="col-sm-4">
            <div className="login-form">
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="email" placeholder="Email Address" name='email' value={input.email} onChange={handleInput} />
                        {renderError('email')}
                    </div>
                    <div>
                        <input type="password" placeholder="Password" name='pass' value={input.pass} onChange={handleInput} />
                        {renderError('pass')}
                    </div>
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
