import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.resolve('db.json');

const readData = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { events: [] };
  }
};

const writeData = async (data) => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

export const getAllProducts = async (req, res) => {
  const data = await readData();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data.events));
};

// Renamed from `getProducts` to `getProductsById`
export const getProductsById = async (req, res, id) => {
  const data = await readData();
  const event = data.events.find(event => event.id === parseInt(id));
  if (event) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(event));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Event not found' }));
  }
};

export const createProducts = async (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      const { title, imageUrl, price, date, location, company } = JSON.parse(body);
      const data = await readData();
      const newEvent = {
        id: data.events.length > 0 ? data.events[data.events.length - 1].id + 1 : 1,
        title,
        imageUrl,
        price,
        date,
        location,
        company
      };
      data.events.push(newEvent);
      await writeData(data);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newEvent));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid data' }));
    }
  });
};

export const updateProducts = async (req, res, id) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      const { title, imageUrl, price, date, location, company } = JSON.parse(body);
      const data = await readData();
      const eventIndex = data.events.findIndex(event => event.id === parseInt(id));
      if (eventIndex !== -1) {
        const updatedEvent = { id: parseInt(id), title, imageUrl, price, date, location, company };
        data.events[eventIndex] = updatedEvent;
        await writeData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedEvent));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Event not found' }));
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid data' }));
    }
  });
};

export const deleteProducts = async (req, res, id) => {
  const data = await readData();
  const eventIndex = data.events.findIndex(event => event.id === parseInt(id));
  if (eventIndex !== -1) {
    data.events.splice(eventIndex, 1);
    await writeData(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Event deleted successfully' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Event not found' }));
  }
};
