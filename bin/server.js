const http = require('http');
const dotenv = require('dotenv');

dotenv.config();
const app = require('../src/app');

const port = process.env.PORT || '3000';

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
