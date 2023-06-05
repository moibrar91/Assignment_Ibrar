const express = require('express');
const router = express.Router();
const items = require('../models/item_list.json');

router.get('/list', (req, res) => {
  const { size, page } = req.query;
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + parseInt(size);
  const paginatedItems = items.slice(startIndex, endIndex).map(item => ({
    id: item.id,
    item_name: item.item_name,
    item_image: item.item_image,
    item_price: item.item_price
  }));

  res.json(paginatedItems);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  res.json(item);
});

module.exports = router;
