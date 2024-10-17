import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import faction_banner from '../assets/faction_banner.webp'

const DisplayFaction = () => {
  const navigate = useNavigate();

  const {id} = useParams();

  const [faction, setFaction] = useState([])

  // Initilize state for the points values
  const [battleReadyPoints, setBattleReadyPoints] = useState(0);
  const [notBattleReadyPoints, setNotBattleReadyPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/factions/${id}`)
    .then((res) => {
      console.log("Faction: ", res.data);
      setFaction(res.data)

      // Caluclate the points values
      let battleReady = 0;
      let notBattleReady = 0;

      res.data.miniatures.forEach(miniature => {
        if (miniature.battleReady) {
          battleReady += miniature.pointsValue;
        }
        else {
          notBattleReady += miniature.pointsValue;
        }
      });

      setBattleReadyPoints(battleReady);
      setNotBattleReadyPoints(notBattleReady);
      setTotalPoints(battleReady + notBattleReady);

    })
    .catch((err) => {
      console.log(err);
    })
}, [id])

  // Function to sort the names of each miniature in alphabetical order
  const sortMinisByName = (miniatures) => {
    return [...miniatures].sort((a, b) => a.name.localCompare(b.name));
  };

  const deleteFaction = () => {
    console.log("Delete function called with ID:"); // Trying to debug
    axios.delete(`http://localhost:8001/api/factions/${id}`)
      .then((res) => {
        console.log("MESSAGE: Faction deleted ", res.data); 
        navigate("/factions")
      })
      .catch((err) => {
        console.error("Error deleting faction:", err);
      });
  };


  return (
    <div className="main-body">
      <div className="main-body__top">
        <img src={faction_banner} alt="Faction Banner" className="faction-banner" />
        <h2 className="faction-banner__heading">My {faction.factionName}</h2>
      </div>
      <div className="faction-body__content">
        <div className="faction-details__wrapper">
          <div className="faction-table__wrapper">
            <Table striped bordered >
              <thead>
                <tr>
                  <th className="bg-dark text-white" >Epic Heroes</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Epic Hero")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Characters</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Character")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Battleline</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Battleline")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Infantry</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Infantry")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Mounted</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Mounted")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Vehicle</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Vehicle")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Dedicated Transport</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                  {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Dedicated Transport")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th className="bg-dark text-white">Fortification</th>
                  <th className="bg-dark text-white">Quantity</th>
                  <th className="bg-dark text-white">Battle Ready</th>
                  <th className="bg-dark text-white">Points</th>
                  <th className="bg-dark text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                {faction.miniatures && faction.miniatures
                    .filter(miniature => miniature.category === "Fortification")
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(miniature => (
                      <tr key={miniature._id}>
                      <td>{miniature.name}</td>
                      <td>{miniature.quantity}</td>
                      <td>{miniature.battleReady ? 'Yes' : 'No'}</td>
                      <td>{miniature.pointsValue}</td>
                      <td><Link to={`/miniatures/${miniature._id}`}>View</Link></td>
                    </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="faction-info__wrapper">
            <div className="faction-data">
            <h5 className="faction-details__heading">Faction Name:</h5>
            <p className="body-text">{faction.factionName}</p>
            </div>
            <div className="faction-data">
            <h5 className="faction-details__heading">Allegiance:</h5>
            <p className="body-text">{faction.allegiance}</p>
            </div>
            <div className="faction-data">
            <h5 className="faction-details__heading">Battle Ready:</h5>
            <p className="body-text">{battleReadyPoints}pts</p>
            </div>
            <div className="faction-data">
            <h5 className="faction-details__heading">Not Battle Ready:</h5>
            <p className="body-text">{notBattleReadyPoints} pts</p>
            </div>
            <div className="faction-data">
            <h5 className="faction-details__heading">Total Points:</h5>
            <p className="body-text">{totalPoints} pts</p>
            </div>
            <div className="faction-button__wrapper">
            <Button variant="primary" className='faction-button' as={Link} to={`/factions/${faction._id}/miniatures/add`}>Add Unit</Button>
            <Button variant="primary" className='faction-button' onClick={() => deleteFaction(faction._id)}>Delete Faction</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayFaction;