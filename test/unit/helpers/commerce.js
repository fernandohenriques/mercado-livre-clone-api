const { assert } = require('chai');
const { getPriceAmount, getPriceDecimals } = require('../../../src/helpers/commerce');

describe('Commerce functions', () => {
  it('Should get amount in the full price', () => {
    const price = 953.10;
    assert.deepEqual(getPriceAmount(price), 953);
  });

  it('Should get decimals in the full price', () => {
    const price = 2580.99;
    assert.deepEqual(getPriceDecimals(price), 99);
  });
});
