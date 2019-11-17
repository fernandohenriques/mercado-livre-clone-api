const { getProducts, getProduct } = require('../repositories/product-repository');

const productActions = {
  search: async (req, res) => {
    const query = req.query.q;

    if (query) {
      const result = await getProducts(query);
      res.status(200).send({ ...result });
    } else {
      res.status(422).send();
    }
  },

  items: async (req, res) => {
    const id = req.params.id;

    if (id) {
      const result = await getProduct(id);
      res.status(200).send({ ...result });
    } else {
      res.status(422).send();
    }
  },
};

module.exports = productActions;
