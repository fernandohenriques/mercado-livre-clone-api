const{ MeliSearchApi, MeliItemApi } = require('../config/apis');

const MLService = {
  searchItems: async (q) => {
    try {
      const result = await MeliSearchApi.get(`?q=${q}&limit=10`);
      return result && result.data || null;
    } catch(e) {
      return null;
    }
  },

  getItem: async (id) => {
    try {
      const [item, itemDescription] = await Promise.all([
        MeliItemApi.get(`/${id}`),
        MeliItemApi.get(`/${id}/description`),
      ]);

      return item && item.data && itemDescription && itemDescription.data && { ...item.data, ...itemDescription.data } || null;
    } catch(e) {
      return null;
    }
  },
};

module.exports = MLService;
