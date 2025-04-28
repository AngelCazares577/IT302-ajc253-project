//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

export default function Login({ login }) {
  const [name, setName] = useState('');
  const [user_id, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !user_id.trim()) return;
    login({ name, _id: user_id });
    navigate('/ajc253_intelligences');
  };

  return (
    <Container className="mt-4" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Log in</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            value={user_id}
            onChange={e => setUserId(e.target.value)}
            placeholder="any unique string"
            required
          />
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </Container>
  );
}
