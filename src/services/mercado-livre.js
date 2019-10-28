const axios = require('axios');

const searchInstance = axios.create({
  baseURL: `${process.env.MLA_SEARCH_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const MLService = {
  searchItems: async (q) => {
    try {
      const result = await searchInstance.get(`?q=${q}&limit=10`);
      return result && result.data || null;
    } catch(e) {
      return null;
    }
  },
};

module.exports = MLService;
