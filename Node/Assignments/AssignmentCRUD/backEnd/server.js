import http from 'http';
import chalk from 'chalk'
import routes from './router.js'; // Ensure the file name matches

const PORT = 3003;

// Create the server and handle requests
const server = http.createServer((req, res) => {
  // Set CORS headers for every request
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Delegate request handling to the router
  routes(req, res);
});

// Start the server
server.listen(PORT, () => {
  console.log(chalk.red(`Server is running on http://localhost:${PORT}`));
});
