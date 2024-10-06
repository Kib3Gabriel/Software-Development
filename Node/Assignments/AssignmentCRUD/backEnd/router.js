import { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts } from './controller.js';

const routes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/api/events' && method === 'GET') {
    getAllProducts(req, res);
  } else if (url.match(/\/api\/events\/\d+/) && method === 'GET') {
    //id is in the index 3
    const id = url.split('/')[3];
    getProductsById(req, res, id);
  } else if (url === '/api/product' && method === 'POST') {
    createProducts(req, res);
  } else if (url.match(/\/api\/events\/\d+/) && method === 'PUT') {
    const id = url.split('/')[3];
    updateProducts(req, res, id);
  } else if (url.match(/\/api\/events\/\d+/) && method === 'DELETE') {
    const id = url.split('/')[3];
    deleteProducts(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
};

export default routes;
