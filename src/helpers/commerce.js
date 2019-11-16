const getPriceAmount = (price) => {
  const priceAsString = price.toString();
  const amount = priceAsString.indexOf('.') !== -1 ? priceAsString.split('.')[0] : price;
  return Number(amount);
};

const getPriceDecimals = (price) => {
  const priceAsString = price.toString();
  const decimals = priceAsString.indexOf('.') !== -1 ? priceAsString.split('.').pop() : undefined;
  return Number(decimals);
};

module.exports = {
  getPriceAmount,
  getPriceDecimals,
};
