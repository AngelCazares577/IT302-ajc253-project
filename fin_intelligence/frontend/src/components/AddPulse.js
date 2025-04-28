//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import IntelligenceDataService from '../services/IntelligenceDataService';

export default function AddPulse({ user, editing = false }) {
  const { id: articleId, pulseId }   = useParams();
  const navigate                     = useNavigate();
  const location                     = useLocation();

  // location.state.pulseText (if present) is passed from the “Edit” button
  const [text, setText]              = useState(location.state?.pulseText || '');


  const save = e => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editing) {
      IntelligenceDataService
        .updatePulse(pulseId, { pulse: text, user_id: user._id })
        .then(() => navigate(`/ajc253_intelligences/${articleId}`))
        .catch(console.error);
    } else {
      IntelligenceDataService
        .createPulse(articleId, {
          user_name: user.name,
          pulse    : text,
          user_id  : user._id,
        })
        .then(() => navigate(`/ajc253_intelligences/${articleId}`))
        .catch(console.error);
    }
  };

  if (!user)
    return <Alert variant="info">Please log in first.</Alert>;

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h4>{editing ? 'Edit' : 'Add'} Pulse</h4>

      <Form onSubmit={save}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={4}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a thoughtful pulse…"
            required
          />
        </Form.Group>

        <Button type="submit">
          {editing ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
}
