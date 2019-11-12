const { setup } = require('axios-cache-adapter');

const MeliSearcApi = setup({
  baseURL: `${process.env.MLA_SEARCH_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  cache: {
    maxAge: 30 * 60 * 1000,
  },
});

const MLService = {
  searchItems: async (q) => {
    try {
      const result = await MeliSearcApi.get(`?q=${q}&limit=10`);
      return result && result.data || null;
    } catch(e) {
      return null;
    }
  },
};

module.exports = MLService;
