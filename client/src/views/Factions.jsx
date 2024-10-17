import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import faction_banner from '../assets/faction_banner.webp'
import lasgun from '../assets/lasgun.webp'
import space_marine from '../assets/space_marine_bolt_rifle.webp'
import chaos from '../assets/chaos_bolter.webp'
import eldar_rifle from '../assets/eldar_rifle.webp'

const Factions = (props) => {
  const {errors, errorUpdater} = props;
  const [factions, setFactions] = useState([])
  const navigate = useNavigate();

  const [factionData, setFactionData] = useState({
    factionName: "",
    allegiance: "",
  })

  // SINGLE STATE OBJECT for the FRONT-END VALIDATION form errors
  const [formErrors, setFormErrors] = useState({
    factionName: "",
    allegiance: "",
  });

  // FRONT-END ERROR VALIDATIONS
  const factionNameHandler = (e) => {
    const value = e.target.value;
    let errorMsg = '';
    if (value) {
      if (value.length < 2) {
        errorMsg = "Faction name must contain at least 2 characters"
      } else if (value.length >40) {
        errorMsg = "Faction name cannot exceed 40 characters"
      }
    } else {
      errorMsg = "Faction name is required"
    }
    setFactionData((prevData) => ({...prevData, factionName: value}));
    setFormErrors((prevFormErrors) => ({...prevFormErrors, factionName: errorMsg}))
    }

    const allegianceHandler = (e) => {
      const value = e.target.value;
      let errorMsg = '';
      if (value.length < 1) {
        errorMsg = "Allegiance required"
      }
      setFactionData((prevData) => ({...prevData, allegiance: value}));
      setFormErrors((prevFormErrors) => ({...prevFormErrors, allegiance: errorMsg}))
    }

  useEffect (() => {
    axios.get('http://localhost:8001/api/factions')
      .then((res) => {
        console.log("Factions: ", res.data);
        setFactions(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const validateForm = () => {
    return Object.values(formErrors).every(value => value === '');
  }

  const imageHandler = (allegiance) => {
    if (allegiance == 'Space Marines') {
      return space_marine;
    }
    else if (allegiance == "Chaos") {
      return chaos;
    }
    else if (allegiance == "Imperium") {
      return lasgun;
    }
    else {
      return eldar_rifle;
    }
  }

  const createFaction = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8001/api/factions/create", factionData)
      .then((res) => {
        console.log(res.data)
        setFactions((prevFactions) => [...prevFactions, res.data]);
        setFactionData({
          factionName: "",
          allegiance: ""
        })
      })
      .catch ((err) => {
        console.log(err);
        errorUpdater(err.response.data.errors)
      })
  }


  return (
    <div className="main-body">
      <div className="main-body__top">
        <img src={faction_banner} alt="Faction Banner" className="faction-banner" />
        <h2 className="faction-banner__heading">My Factions</h2>
        <p className="body-text">Select a faction to view your current forces or create a new one and begin recruiting.</p>
      </div>
      <div className="main-body__content">
        <div className="faction-cards__wrapper">
          {
            factions.map((faction) => (
              <Card className="faction-card" style={{ width: '18rem', boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', paddingTop: '2em', gap: '1em' }} key={faction._id}>
                <Card.Img className="faction-img" style={{height: '7em'}} variant="top" src={imageHandler(faction.allegiance)} />
              <Card.Body className="faction-card__body">
                <Card.Title className="faction-card__title">{faction.factionName}</Card.Title>
                <Button variant="primary" as={Link} to={`/factions/${faction._id}`}>View</Button>
              </Card.Body>
            </Card>
            ))
          }
        </div>
        <div className="faction-form__wrapper">
          <div className="faction-form__wrapper-top">
            <h3 className="faction-form__heading">Add a Faction</h3>
          </div>
          <form onSubmit={createFaction} className="faction-form">
              <div className="input-wrapper">
                <label htmlFor="factionName">Faction Name:</label>
                <input type="text" name="factionName" id="factionName" value={factionData.factionName} onChange={factionNameHandler}/>
                {formErrors.factionName && <p style={{color:"red"}} >{formErrors.factionName}</p>}
                {errors.factionName && <p style={{color:"red"}} >{errors.factionName.message}</p>}
              </div>
              <div className="input-wrapper">
                <label htmlFor="allegiance">Allegiance:</label>
                <select name="allegiance" id="allegiance" value={factionData.allegiance}  onChange={allegianceHandler}>
                  <option value="">Choose your allegiance...</option>
                  <option value="Space Marines">Space Marines</option>
                  <option value="Imperium">Imperium</option>
                  <option value="Chaos">Chaos</option>
                  <option value="Xenos">Xenos</option>
              </select>
              {formErrors.allegiance && <p style={{color:"red"}} >{formErrors.allegiance}</p>}
              {errors.allegiance && <p style={{color:"red"}} >{errors.allegiance.message}</p>}
              </div>
              <Button type='submit' variant="primary" disabled={!validateForm()}>Submit</Button>
            </form>
        </div>
      </div>
      
    </div>
  );


}

export default Factions;