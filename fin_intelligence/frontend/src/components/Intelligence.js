//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Spinner,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import IntelligenceDataService from '../services/IntelligenceDataService';

export default function Intelligence({ user }) {
  const { id: articleId } = useParams();
  const navigate          = useNavigate();

  const [article, setArticle] = useState(null);
  const [pulses, setPulses]   = useState([]);
  const [loadingArticle, setLoadArt] = useState(true);
  const [loadingPulses,  setLoadPul] = useState(true);

  useEffect(() => {
    setLoadArt(true);
    IntelligenceDataService.get(articleId)
      .then(res => setArticle(res.data.intelligence))
      .finally(() => setLoadArt(false));
  }, [articleId]);

  useEffect(() => {
    setLoadPul(true);
    IntelligenceDataService.getPulses(articleId)
      .then(res => setPulses(res.data))
      .finally(() => setLoadPul(false));
  }, [articleId]);

  // Deletes a pulse if user matches
  const handleDelete = pulseId => {
    IntelligenceDataService
      .deletePulse(pulseId, user._id)
      .then(() => setPulses(prev => prev.filter(p => p._id !== pulseId)))
      .catch(console.error);
  };

  if (loadingArticle)
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );

  if (!article)
    return (
      <Container className="mt-4">
        <Alert variant="danger">Article not found.</Alert>
      </Container>
    );

  return (
    // Returns styled layout with article and pulses
    <Container className="py-4">

      <Card className="mb-4 shadow-sm">
        <Card.Img
          variant="top"
          src={article.banner_image}
          alt="banner"
          style={{ height: 300, objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.summary}</Card.Text>
          {user && (
            <Card.Text className="text-muted">
              Logged in as {user.name}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
      <h4 className="mb-3">Pulses</h4>

      {loadingPulses ? (
        <Spinner animation="border" />
      ) : pulses.length ? (
        pulses.map(p => (
          <Card key={p._id} className="mb-3">
            <Card.Body>
              <Row className="align-items-start">
                <Col>
                  <strong>{p.user_name || p.name}</strong>
                  <Card.Text className="mb-2">{p.pulse}</Card.Text>
                  <small className="text-muted">
                    {new Date(p.lastModified).toLocaleString()}
                  </small>
                </Col>

                {user && user._id === p.user_id && (
                  <Col xs="auto" className="d-flex align-items-start gap-2">
                    <Link
                      to={`/ajc253_intelligences/${articleId}/pulse/${p._id}`}
                      state={{ pulseText: p.pulse }}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Edit
                    </Link>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No pulses yet.</p>
      )}

      {user && (
        <Button
          onClick={() => navigate(`/ajc253_intelligences/${articleId}/pulse`)}
        >
          Add Pulse
        </Button>
      )}
    </Container>
  );
}
