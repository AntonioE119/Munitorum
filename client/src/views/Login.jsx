import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { userContext } from "../context/userContext";


// SINGLE-STATE OBJECT for the login form
const Login = (props) => {
  const {user, setUser} = useContext(userContext);
  const {errors, errorUpdater} = props;

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

// To Do! - submit handler
const loginHandler = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8001/api/login', loginData, {withCredentials:true})
    .then((res) => {
      console.log(res);
      navigate('/factions')
    })
    .catch((err) => {
      console.log(err);
      errorUpdater(err.response.data.errors)
    })
}

return (
  <section className="main-body">
    <div className="login-form__wrapper">
      <form className="user-form" onSubmit={loginHandler}>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input className="input-field" type="email" name='email' id='email' value={loginData.email} onChange={handleChange} />
          {errors.email && <p style={{color:"red"}} >{errors.email.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input className="input-field" type="password" name='password' id='password' value={loginData.password} onChange={handleChange} />
          {errors.password && <p style={{color:"red"}} >{errors.password.message}</p>}
        </div>
        <button className='form-button' type='submit'>Submit</button>
      </form>
      <div>
        <Link to="/register">Don't have an account?</Link>
      </div>
    </div>
  </section>
)
}

export default Login;