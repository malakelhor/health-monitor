const express = require('express');
const router = express.Router();
const Endpoint = require('../models/Endpoint');

router.get('/', async (req, res) => {
  try {
    const endpoints = await Endpoint.find();
    res.json(endpoints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const endpoint = new Endpoint(req.body);
    await endpoint.save();
    res.status(201).json(endpoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Endpoint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;