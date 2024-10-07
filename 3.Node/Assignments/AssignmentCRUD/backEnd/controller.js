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

//writes data into db.json
const writeData = async (data) => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

//retrieves all product data from a database9(db.json), then responds to
//a HTTP request with data.
export const getAllProducts = async (req, res) => {
  const data = await readData();
  res.writeHead(200, { 'Content-Type': 'application/json' });
   // This sets the HTTP status code to 200 (indicating success) and the
  // response header Content-Type to 'application/json', meaning that
  // the data returned to the client will be in JSON format.
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

// sets up a listener for the 'data' event on the request object. When the
// client sends data (in chunks), this event is triggered. Each chunk of 
// data is converted to a string and added to the body variable.
  req.on('data', chunk => {
    body += chunk.toString();
  });

  //sets a listener for the 'end' event which triggers when all data has been recieved
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

      //adds the new product to the array of existing events
      data.events.push(newEvent);
      //saves the updated list of events back to the sb.json file
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
      //findIndex, used to find the index of the event with the specified id in events array
      const eventIndex = data.events.findIndex(event => event.id === parseInt(id));
      if (eventIndex !== -1) {
        const updatedEvent = { id: parseInt(id), title, imageUrl, price, date, location, company };
        //old events in data.events is replaced with the new updatedEvent
        data.events[eventIndex] = updatedEvent;
        //saves the updated events list to the db.json file
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
