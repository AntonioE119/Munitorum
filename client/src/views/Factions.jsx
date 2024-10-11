import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const Factions = (props) => {
  const {user, setUser} = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    axios.post('http://localhost:8001/api/logout',{}, {withCredentials:true})
    .then(() => {
      navigate('/')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>My Factions</h1>
    <button onClick={logout}>Logout</button>
    </div>
  )


}

export default Factions;