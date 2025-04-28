//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import IntelligenceList from './components/IntelligenceList';
import Intelligence from './components/Intelligence';
import Login from './components/Login';
import AddPulse from './components/AddPulse';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // toggle login / logout
  const handleLoginLogout = () => {
    if (user) {
      setUser(null);
    } else {
      navigate('/ajc253_login');
    }
  };

  return (
    <>
      {/* top bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="px-4">
          <Navbar.Brand as={Link} to="/">
            Alpha Intelligence
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/ajc253_intelligences">
                Home
              </Nav.Link>
            </Nav>

            {user && (
              <Navbar.Text className="me-3">Welcome, {user.name}</Navbar.Text>
            )}
            <Button
              variant={user ? 'outline-danger' : 'primary'}
              onClick={handleLoginLogout}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<IntelligenceList />} />
        <Route path="/ajc253_intelligences" element={<IntelligenceList />} />
        <Route
          path="/ajc253_intelligences/:id"
          element={<Intelligence user={user} />}
        />
        <Route
          path="/ajc253_intelligences/:id/pulse"
          element={<AddPulse user={user} />}
        />
        <Route
          path="/ajc253_intelligences/:id/pulse/:pulseId"
          element={<AddPulse user={user} editing />}
        />

        {/* login */}
        <Route path="/ajc253_login" element={<Login login={setUser} />} />
      </Routes>
    </>
  );
}
