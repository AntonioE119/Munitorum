import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import add_unit_banner from '../assets/add_unit_banner.webp'
import Button from 'react-bootstrap/esm/Button';

const AddUnit = (props) => {
  const {errors, errorUpdater} = props;
  const { factionId } = useParams();

  const navigate = useNavigate();

  // SINGLE-STATE OBJECT for the create a miniature form
  const [miniatureData, setMiniatureData] = useState({
    name: "",
    quantity: "",
    pointsValue: "",
    category: "",
    battleReady: false,
    legends: false
  });

  // SINGLE-STATE OBJECT for the form errors needed for front end validation
  const [formErrors, setFormErrors] = useState({
    name: "",
    quantity: "",
    pointsValue: "",
    category: ""
  })

  const nameHandler = (e) => {
    const value = e.target.value;
    let errorMsg = '';
      if (value) {
        if (value.length < 2) {
          errorMsg = "Unit name must be at least 2 characters long";
        } else if (value.length > 255) {
          errorMsg = "Unit name cannot exceed 255 characters!";
        }
      } else {
        errorMsg = "Name is required!"
      }
      setMiniatureData((prevMiniatureData) => ({...prevMiniatureData, name: value}));
      setFormErrors((prevFormErrors) => ({...prevFormErrors, name: errorMsg}))
  }

  const quantityHandler = (e) => {
    const value = e.target.value; // Keep the spaces (if it's a number input, spaces will be ignored)
    let errorMsg = '';
    if (value === "") {
      errorMsg = "Quantity required!";
    } else if (value < 1) {
      errorMsg = "Unit must contain at leas 1 miniature";
    }
    setMiniatureData((prevMiniatureData) => ({ ...prevMiniatureData, quantity: value }));
    setFormErrors((prevFormErrors) => ({ ...prevFormErrors, quantity: errorMsg }));
  };

  const pointsHandler = (e) => {
    const value = e.target.value; // Keep the spaces (if it's a number input, spaces will be ignored)
    let errorMsg = '';
    if (value === "") {
      errorMsg = "Points value required!";
    } else if (value < 1) {
      errorMsg = "Unit must be worth at least 1 point";
    }
    setMiniatureData((prevMiniatureData) => ({ ...prevMiniatureData, pointsValue: value }));
    setFormErrors((prevFormErrors) => ({ ...prevFormErrors, pointsValue: errorMsg }));
  };

  const categoryHandler = (e) => {
    const value = e.target.value;
    let errorMsg = '';
    if (value.length < 1) {
      errorMsg = "Battlefield role required"
    }
    setMiniatureData((prevData) => ({...prevData, category: value}));
    setFormErrors((prevFormErrors) => ({...prevFormErrors, category: errorMsg}))
  }

  const validateForm = () => {
    return Object.values(formErrors).every(value => value === '');
  }

  const createMiniature = (e) => {
    e.preventDefault()
    console.log("Miniature Data Before Submit:", miniatureData);
    axios.post('http://localhost:8001/api/miniatures/create', {factionId, miniatureData})
      .then((res) => {
        console.log("MESSAGE: Unit Added")
        alert("Unit successfully added!")
        setMiniatureData({
          name: "",
          quantity: "",
          pointsValue: "",
          category: "",
          battleReady: false,
          legends: false
        })
      })
      .catch((err) => {
        console.log("ERROR: Unit failed to be created")
        errorUpdater(err.response.data.errors)
      })
  }

  return (
    <div className="main-body">
      <div className="main-body__top">
        <img src={add_unit_banner} alt="Add Unit Banner" className="faction-banner" />
        <h2 className="faction-banner__heading">Add A Unit</h2>
      </div>
      <div className="add-unit__body">
        <Link to={`/factions/${factionId}`}><p className='body-text'>Back to Faction</p></Link>
        <div className="unit-form__wrapper">
          <form onSubmit={createMiniature} className='unit-form'>
            <div className="input-wrapper">
              <label htmlFor="name">Unit Name:</label>
              <input type="text" name="name" id="name" value={miniatureData.name} onChange={nameHandler} />
              {formErrors.name && <p style={{color:"red"}} >{formErrors.name}</p>}
              {errors.name && <p style={{color:"red"}} >{errors.name.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" name="quantity" id="quantity" value={miniatureData.quantity} onChange={quantityHandler}/>
              {formErrors.quantity && <p style={{color:"red"}} >{formErrors.quantity}</p>}
              {errors.quantity && <p style={{color:"red"}} >{errors.quantity.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="pointsValue">Point Value:</label>
              <input type="pointsValue" name="pointsValue" id="pointsValue" value={miniatureData.pointsValue} onChange={pointsHandler} />
              {formErrors.pointsValue && <p style={{color:"red"}} >{formErrors.pointsValue}</p>}
              {errors.pointsValue && <p style={{color:"red"}} >{errors.pointsValue.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="category">Battlefield Role:</label>
              <select name="category" id="category" value={miniatureData.category} onChange={categoryHandler}>
                <option value="">Select Battlefield Role...</option>
                <option value="Epic Hero">Epic Hero</option>
                <option value="Character">Character</option>
                <option value="Battleline">Battleline</option>
                <option value="Infantry">Infantry</option>
                <option value="Mounted">Mounted</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Dedicated Transport">Dedicated Transport</option>
                <option value="Fortification">Fortification</option>
              </select>
              {formErrors.category && <p style={{color:"red"}} >{formErrors.category}</p>}
              {errors.category && <p style={{color:"red"}} >{errors.category.message}</p>}
            </div>
            <div className="check-wrapper">
              <label htmlFor="battleReady">Battle Ready (Painted)?</label>
              <input className="input-field" type="checkbox" name="battleReady" id="battleReady" value={true} checked={miniatureData.battleReady} onChange={() => {setMiniatureData(prev => ({...prev, battleReady: !miniatureData.battleReady}))}}/>
            </div>
            <div className="check-wrapper">
              <label htmlFor="legends">Legends?</label>
              <input className="input-field" type="checkbox" name="legends" id="legends" value={true} checked={miniatureData.legends} onChange={() => {setMiniatureData(prev => ({...prev, legends: !miniatureData.legends}))}}/>
            </div>
            <Button type='submit' variant="primary" disabled={!validateForm()}>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUnit;