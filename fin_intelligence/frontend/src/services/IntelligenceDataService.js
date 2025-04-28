//Angel Cazares
//ajc253@njit.edu
//IT302-452
// 4/28/25

import axios from 'axios';

// Base URL
const BASE = process.env.REACT_APP_BACKEND_URL;
// All intelligence routes live under this root
const ROOT = `${BASE}/api/v1/ajc253/intelligence`;

class IntelligenceDataService {
  //Retrieve, get, and find for intelligence, varying amounts
  getAll()            { return axios.get(ROOT); }
  get(id)             { return axios.get(`${ROOT}/${id}`); }
  find(query)         { return axios.get(`${ROOT}?title=${query}`); }

  //pulses
  createPulse(articleId, { user_name, pulse, user_id }) {
    return axios.post(ROOT, {
      article_id: articleId,
      user_name,
      pulse,
      user_id,
    });
  }

  updatePulse(pulseId, { pulse, user_id }) {
    return axios.put(ROOT, {
      pulse_id: pulseId,
      pulse,
      user_id,
    });
  }


  deletePulse(pulseId, user_id) {
    return axios.delete(ROOT, {
      data: { pulse_id: pulseId, user_id },
    });
  }

  // Fetch every pulse tied to one article
  getPulses(articleId) {
    return axios.get(`${ROOT}/pulse`, {
      params: { article_id: articleId },
    });
  }
}

const intelligenceDataService = new IntelligenceDataService();
export default intelligenceDataService;
