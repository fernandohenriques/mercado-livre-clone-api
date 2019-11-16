const R = require('ramda');
const product = require('../models/Product');
const { searchItems, getItem } = require('../services/mercado-livre');
const { getPriceAmount, getPriceDecimals } = require('../helpers/commerce');

const getCoverImage = (item) => {
  if (item.pictures && item.pictures.length > 0) return item.pictures[0].url;
  return item.thumbnail;
};

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
    const promiseItems = result.results.map(async item => {
      const detailItem = await getItem(item.id);

      const { error, value } = product.validate({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: getPriceAmount(item.price),
          decimals: getPriceDecimals(item.price),
        },
        picture: getCoverImage(detailItem),
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        address: {
          state_id: item.address.state_id,
          state_name: item.address.state_name,
        },
      });

      if (!error) items.push(value);
    });

    await Promise.all(promiseItems);

    return {
      categories,
      items,
    };
  }

  return null;
};

const getProduct = async (id) => {
  const item = await getItem(id);

  if (item) {
    const { error, value } = product.validate({
      id: item.id,
      title: item.title,
      description: item.plain_text,
      price: {
        currency: item.currency_id,
        amount: getPriceAmount(item.price),
        decimals: getPriceDecimals(item.price),
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
