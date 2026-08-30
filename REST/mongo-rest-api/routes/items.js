const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items (Read)
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST create item (Create)
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  const savedItem = await newItem.save();
  res.status(201).json(savedItem);
});

// PUT update item (Update)
router.put('/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.id, req.body, { new: true });
  res.json(updatedItem);
});

// DELETE item (Delete)
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

module.exports = router;