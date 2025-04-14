//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     4/14/25

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import IntelligenceDataService from '../services/IntelligenceDataService';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function Intelligence({ user }) {
  const { id } = useParams();
  const [intelligence, setIntelligence] = useState(null);

  // Wrap the fetchIntelligence function with useCallback so it only changes when 'id' changes.
  const fetchIntelligence = useCallback(() => {
    IntelligenceDataService.get(id)
      .then((response) => {
        setIntelligence(response.data.intelligence);
        //console.log("seeking error")
        //console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching intelligence data:', error);
      });
  }, [id]);

  useEffect(() => {
    fetchIntelligence();
  }, [fetchIntelligence]);

  if (!intelligence) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    // Returns styled layout with intelligence 
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card 
        style={{ 
          maxWidth: '700px', 
          width: '100%', 
          borderRadius: '1rem', 
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
        }}
        className="overflow-hidden"
      >
        <Card.Img 
          variant="top" 
          src={intelligence.banner_image} 
          alt="description" 
          style={{ 
            height: '300px', 
            objectFit: 'cover' 
          }}
        />
        <Card.Body className="px-4 py-4">
          <Card.Title className="mb-3" style={{ fontSize: '1.75rem' }}>
            {intelligence.title}
          </Card.Title>
          <Card.Text style={{ fontSize: '1.05rem', color: '#444' }}>
            {intelligence.summary}
          </Card.Text>

          {user && (
            <Card.Text className="text-muted mt-4 mb-0" style={{ fontSize: '0.95rem' }}>
              Logged in as: {user.name}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Intelligence;
