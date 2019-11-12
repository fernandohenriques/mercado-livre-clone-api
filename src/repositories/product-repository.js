const R = require('ramda');
const product = require('../models/Product');
const { searchItems, getItem } = require('../services/mercado-livre');

const getProducts = async (query) => {
  const result = await searchItems(query);

  if (result) {
    const filters = result.filters;
    const categoriesFilters = R.find(R.propEq('id', 'category'))(filters) || [];

    const categories = [];
    categoriesFilters.values
      && Array.isArray(categoriesFilters.values)
      && categoriesFilters.values.forEach(value => value.path_from_root.map(path => categories.push(path.name)));

    const items = [];
    result.results.forEach(item => {
      const { error, value } = product.validate({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        address: {
          state_id: item.address.state_id,
          state_name: item.address.state_name,
        },
      });

      if (!error) items.push(value);
    });

    return {
      categories,
      items,
    };
  }

  return null;
};

const getProduct = async (id) => {
  return null;
};

module.exports = {
  getProduct,
  getProducts,
};
