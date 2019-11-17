const faker = require('faker');
const { assert } = require('chai');
const author = require('../../../src/models/Author');

describe('Model Author', () => {
  it('Should validate one author without error', () => {
    const { error } = author.validate({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });

    assert.isUndefined(error);
  });
});
