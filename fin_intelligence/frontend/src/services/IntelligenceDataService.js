//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     4/14/25

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class IntelligenceDataService {
  // Retrieve all intelligence records
  getAll() {
    return axios.get(`${BACKEND_URL}/api/v1/ajc253/intelligence`);
  }

  // Retrieve a single intelligence record by ID
  get(id) {
    return axios.get(`${BACKEND_URL}/api/v1/ajc253/intelligence/${id}`);
  }

  // Search intelligence records using a query parameter
  find(query) {
    return axios.get(`${BACKEND_URL}/api/v1/ajc253/intelligence?title=${query}`);
  }
}

export default new IntelligenceDataService();
