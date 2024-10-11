import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";


const Register = (props) => {
  const {user, setUser} = useContext(userContext);
  const {errors, errorUpdater} = props;

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8001/api/register', registerData, {withCredentials:true})
    .then((res) => {
      console.log(res);
      setUser(res.data)
      navigate('/factions')
    })
    .catch((err) => {
      console.log(err)
      errorUpdater(err.response.data.errors)
    })
  }

  return (
    <section className="main-body">
      <div className="reg-form__wrapper">
      <form className="user-form" onSubmit={registerHandler}>
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name:</label>
          <input className="input-field" type="text" name='firstName' id='firstName' onChange={handleChange}/>
          {errors.firstName && <p style={{color:"red"}} >{errors.firstName.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Last Name:</label>
          <input className="input-field" type="text" name='lastName' id='lastName' onChange={handleChange}/>
          {errors.lastName && <p style={{color:"red"}} >{errors.lastName.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input className="input-field" type="email" name='email' id='email' onChange={handleChange}/>
          {errors.email && <p style={{color:"red"}} >{errors.email.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input className="input-field" type="password" name='password' id='password' onChange={handleChange}/>
          {errors.password && <p style={{color:"red"}} >{errors.password.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input className="input-field" type="password" name='confirmPassword' id='confirmPassword' onChange={handleChange}/>
          {errors.confirmPassword && <p style={{color:"red"}} >{errors.confirmPassword.message}</p>}
        </div>
        <button className='form-button' type='submit'>Register</button>
      </form>
    </div>
    <div>
        <Link to="/">Already have an account?</Link>
    </div>
  </section>
  )


}

export default Register;