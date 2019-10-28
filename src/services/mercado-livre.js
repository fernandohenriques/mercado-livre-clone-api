
const MLService = {
  searchItems: (q) => {
    console.log(q);
    console.log(process.env.MLA_SEARCH_URL);
  },
};

module.exports = MLService;
