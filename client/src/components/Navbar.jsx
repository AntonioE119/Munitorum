import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import servo_skull_logo from '../assets/servo_skull_logo.webp'

const Navbar = () => {

  const navigate = useNavigate();




  return (
    <section className="top-nav">
      <div className="top-nav__inner">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo-wrapper">
            <img className="logo" src={servo_skull_logo} alt="Servo Skull" />
            <h3 className="nav-heading">The Munitorum</h3>
          </div>
        </Link>
        <div className="links-wrapper">
        <Button variant="primary" className='faction-button' as={Link} to={`/factions`}>My Factions</Button>
        </div>
      </div>
    </section>
  )
}

export default Navbar;