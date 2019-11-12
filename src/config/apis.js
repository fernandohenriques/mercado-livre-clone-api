const { setup } = require('axios-cache-adapter');

const headersDefault = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const MeliSearchApi = setup({
  baseURL: `${process.env.MLA_SEARCH_URL}`,
  headers: headersDefault,
  cache: {
    maxAge: 30 * 60 * 1000,
  },
});

const MeliItemApi = setup({
  baseURL: `${process.env.MLA_ITEM_URL}`,
  headers: headersDefault,
  cache: {
    maxAge: 120 * 60 * 1000,
  },
});

module.exports = {
  MeliSearchApi,
  MeliItemApi,
};
