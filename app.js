const express = require('express');
const items = require('./fakeDb');

const app = express();
app.use(express.json());

// GET /items - Get the list of shopping items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add a new item to the shopping list
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.json({ added: newItem });
});

// GET /items/:name - Get a specific item by name
app.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// PATCH /items/:name - Update a specific item by name
app.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const itemIndex = items.findIndex(item => item.name === itemName);
  if (itemIndex !== -1) {
    items[itemIndex] = { ...items[itemIndex], ...req.body };
    res.json({ updated: items[itemIndex] });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /items/:name - Delete a specific item by name
app.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const itemIndex = items.findIndex(item => item.name === itemName);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

module.exports = app;

