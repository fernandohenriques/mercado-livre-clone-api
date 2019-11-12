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
  const item = await getItem(id);

  const getCoverImage = (item) => {
    if (item.pictures && item.pictures.length > 0) return item.pictures[0].url;
    return item.thumbnail;
  };

  if (item) {
    console.log(item);
    console.log(item.shipping);
    const { error, value } = product.validate({
      id: item.id,
      title: item.title,
      description: item.plain_text,
      price: {
        currency: item.currency_id,
        amount: item.price,
      },
      picture: getCoverImage(item),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
    });

    if (!error) return value;
  }

  return null;
};

module.exports = {
  getProduct,
  getProducts,
};
