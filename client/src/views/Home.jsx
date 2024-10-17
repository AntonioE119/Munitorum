import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import homepage_banner from '../assets/homepage_banner.webp'

const Home = () => {



  return (
    <div className="homepage-body">
      <div className="main-body__top">
        <h1 className="faction-banner__heading">Welcome to the Munitorum</h1>
        <img src={homepage_banner} alt="Faction Banner" className="faction-banner" />
        <p className="homepage-lede">Blessings of the Omnisiah! Enter below to access the dataslate of your current factions, create factions, and manage your forces.</p>
      </div>
      <div className="button-wrapper">
        <Button variant="primary" className='faction-button' as={Link} to={`/factions`}>Enter</Button>
      </div>
    </div>
  )
}

export default Home;