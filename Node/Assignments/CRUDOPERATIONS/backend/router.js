import { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts } from './controller.js';

const routes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/api/product' && method === 'GET') {
    getAllProducts(req, res);
  } else if (url.match(/\/api\/product\/\d+/) && method === 'GET') {
    const id = url.split('/')[3];
    getProductsById(req, res, id);
  } else if (url === '/api/product' && method === 'POST') {
    createProducts(req, res);
  } else if (url.match(/\/api\/product\/\d+/) && method === 'PUT') {
    const id = url.split('/')[3];
    updateProducts(req, res, id);
  } else if (url.match(/\/api\/product\/\d+/) && method === 'DELETE') {
    const id = url.split('/')[3];
    deleteProducts(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
};

export default routes;
