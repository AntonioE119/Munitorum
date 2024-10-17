import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";
import unit_details from '../assets/unit_details_banner.webp'

const DisplayOneMini = () => {
  const navigate = useNavigate();

  const {id} = useParams();

  const [miniature, setMiniature] = useState({ factions: []})

  useEffect(() => {
    axios.get(`http://localhost:8001/api/miniatures/${id}`)
    .then((res) => {
      console.log("Miniature: ", res.data);
      setMiniature(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [id])

  const deleteMini = () => {
    console.log("Delete miniature called with ID: ", id)
    axios.delete(`http://localhost:8001/api/miniatures/${id}/delete`)
    .then((res) => {
      console.log("Miniature deleted ", res.data);
      navigate(`/factions/${miniature.factions[0]?._id}`)
    })
    .catch ((err) => {
      console.log(err)
    })
  }



  return (
    <div className="main-body">
      <div className="details-body__top">
        <img src={unit_details} alt="View Unit Banner" className="faction-banner" />
        <h2 className="faction-banner__heading">Unit Details</h2>
      </div>
      <div className="unit-details__body">
        <Link to={`/factions/${miniature.factions[0]?._id}`}><p className='body-text'>Back to Faction</p></Link>
        <div className="unit-details__wrapper">
          <div className="unit-details__heading-wrapper">
            <h3>{miniature.name}</h3>
          </div>
          <div className="unit-details__content">
            <p className="body-text"><strong>Battlefield Role: </strong>{miniature.category}</p>
            <p className="body-text"><strong>Points Value: </strong>{miniature.pointsValue}</p>
            <p className="body-text"><strong>Quantity: </strong>{miniature.quantity}</p>
            <p className="body-text"><strong>Battle Ready: </strong>{miniature.battleReady ? 'Yes' : 'No'}</p>
            <p className="body-text"><strong>Legends: </strong>{miniature.legends ? 'Yes' : 'No'}</p>
          </div>
          <div className="unit-details__button-wrapper">
            <Button variant="primary" className='faction-button' as={Link} to={`/miniatures/${id}/edit`}>Edit Unit</Button>
            <Button variant="primary" className='faction-button' onClick={() => deleteMini(miniature._id)}>Delete Unit</Button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default DisplayOneMini;