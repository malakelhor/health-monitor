const express = require('express');
const router = express.Router();
const axios = require('axios');
const Endpoint = require('../models/Endpoint');
const PingResult = require('../models/PingResult');

router.post('/:id', async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) return res.status(404).json({ error: 'Endpoint not found' });

    const start = Date.now();
    let statusCode, status;

    try {
      const response = await axios.get(endpoint.url, { timeout: 5000 });
      statusCode = response.status;
      const responseTime = Date.now() - start;
      status = responseTime > 1000 ? 'slow' : 'up';

      const result = new PingResult({ endpointId: endpoint._id, statusCode, responseTime, status });
      await result.save();
      res.json(result);
    } catch (err) {
      const responseTime = Date.now() - start;
      const result = new PingResult({ endpointId: endpoint._id, statusCode: err.response?.status || 0, responseTime, status: 'down' });
      await result.save();
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history/:id', async (req, res) => {
  try {
    const results = await PingResult.find({ endpointId: req.params.id })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;