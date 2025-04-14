// Angel Cazares
// ajc253@njit.edu
// IT302-452
// 4/14/25

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import IntelligenceList from './components/IntelligenceList';
import Intelligence from './components/Intelligence';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginLogout = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({ name: 'User' });
    }
  };

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow-sm w-100"
        style={{ borderBottom: '1px solid #e5e5e5' }}
      >
        <Container fluid className="px-4">
          <Navbar.Brand as={Link} to="/ajc253_intelligences" className="fw-bold">
            Alpha Intelligence
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
            <Nav className="ms-auto align-items-center">
              {user && (
                <Navbar.Text className="me-3 text-muted">
                  Welcome, {user.name}
                </Navbar.Text>
              )}
              <Button
                variant={user ? 'outline-danger' : 'primary'}
                onClick={handleLoginLogout}
              >
                {user ? 'Logout' : 'Login'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<IntelligenceList />} />
        <Route path="/ajc253_intelligences" element={<IntelligenceList />} />
        <Route path="/ajc253_intelligences/:id" element={<Intelligence user={user} />} />
      </Routes>
    </>
  );
}

export default App;
