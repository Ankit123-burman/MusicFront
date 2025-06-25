import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <>
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
        <style>
{`
  body{
  background: #020024;
background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 39%, rgba(0, 212, 255, 1) 100%);
  }
  .container {
    max-width: 450px;
    margin: 40px auto;
    padding: 30px;
    border-radius: 12px;
    background-color: #121212;
    color: #ffffff;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
  }
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
    color: #ffffff;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .formGroup {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  label {
    font-size: 14px;
    font-weight: 500;
    color: #b3b3b3;
    margin-bottom: 4px;
  }
  input {
    padding: 14px 16px;
    border-radius: 8px;
    border: 1px solid #333;
    background-color: rgba(255, 255, 255, 0.07);
    color: #ffffff;
    font-size: 16px;
    transition: all 0.3s ease;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }
  button {
    padding: 14px;
    background-color: #8c67db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(140, 103, 219, 0.3);
  }
  span {
    margin-top: 20px;
    font-size: 14px;
    color: #b3b3b3;
    text-align: center;
    display: block;
  }
  a {
    color: #8c67db;
    text-decoration: none;
    font-weight: 600;
    margin-left: 5px;
    transition: color 0.3s ease;
  }
`}
</style>

    </>
    )
}

export default Login
