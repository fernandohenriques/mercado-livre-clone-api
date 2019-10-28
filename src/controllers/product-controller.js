
const productActions = {
  search: (req, res) => {
    const query = req.query.q;

    if (query) {

      res.status(200).send({ ok: 'ok' });
    } else res.status(422).send();
  },
};

module.exports = productActions;
