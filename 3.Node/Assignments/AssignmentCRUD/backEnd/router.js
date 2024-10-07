import { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts } from './controller.js';

const routes = (req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Incoming request: ${method} ${url}`); // Debugging log

  // Handle GET requests to retrieve all products
  if (url === '/api/events' && method === 'GET') {
    getAllProducts(req, res);

  // Handle GET request to retrieve a product by ID
  } else if (url.match(/\/api\/events\/\d+/) && method === 'GET') {
    const id = url.split('/')[3];
    getProductsById(req, res, id);

  // Handle POST request to create a new product
  } else if (url === '/api/events' && method ===  'POST') {
    createProducts(req, res);

  // Handle PUT request to update a product by ID
  } else if (url.match(/\/api\/events\/\d+/) && method === 'PUT') {
    const id = url.split('/')[3];
    updateProducts(req, res, id);

  // Handle DELETE request to delete a product by ID
  } else if (url.match(/\/api\/events\/\d+/) && method === 'DELETE') {
    const id = url.split('/')[3];
    deleteProducts(req, res, id);

  // If the route is not found, return 404
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
};

export default routes;
