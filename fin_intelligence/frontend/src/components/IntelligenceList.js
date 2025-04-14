//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     4/14/25
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IntelligenceDataService from '../services/IntelligenceDataService';

function IntelligenceList() {
  const [intelligences, setIntelligences] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    IntelligenceDataService.getAll()
      .then((response) => {
        // Extract the array of MongoDB documents from the 'results' 
        //console.log('API response data:', response.data);
        setIntelligences(response.data.intelligence || []);
      })
      .catch((e) => console.error(e));
  }, []);

  const onChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  const searchIntelligences = () => {
    IntelligenceDataService.find(query)
      .then((response) => {
        setIntelligences(response.data.intelligence || []);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h2>Intelligence List</h2>
      <div>
        <input
          type="text"
          value={query}
          onChange={onChangeSearch}
          placeholder="Search intelligence..."
        />
        <button onClick={searchIntelligences}>Search</button>
      </div>
      <div>
        {intelligences.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <Link to={`/ajc253_intelligences/${item._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntelligenceList;
