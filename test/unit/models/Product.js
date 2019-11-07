const faker = require('faker');
const { assert } = require('chai');
const product = require('../../../src/models/Product');

describe('Model Product', () => {
  const productId = faker.random.uuid().split('-')[0];
  const stateId = faker.random.uuid().split('-')[0];

  it('Should validate one full product without error', () => {
    const { error } = product.validate({
      id: productId,
      title: faker.commerce.productName(),
      price: {
        currency: faker.finance.currencyCode(),
        amount: faker.finance.amount(),
      },
      picture: faker.image.imageUrl(),
      condition: faker.random.word(),
      free_shipping: faker.random.boolean(),
      address: {
        state_id: stateId,
        state_name: faker.address.state(),
      },
    });

    assert.isUndefined(error);
  });

  it('Should returns one product with default value to free_shipping field', () => {
    const { value } = product.validate({
      id: productId,
      title: faker.commerce.productName(),
      price: {
        currency: faker.finance.currencyCode(),
        amount: faker.finance.amount(),
      },
      picture: faker.image.imageUrl(),
      condition: faker.random.word(),
      address: {
        state_id: stateId,
        state_name: faker.address.state(),
      },
    });

    assert.equal(value.free_shipping, false);
  });
});
