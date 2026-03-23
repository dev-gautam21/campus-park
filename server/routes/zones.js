import express from 'express';
import Zone from '../models/Zone.js';

const router = express.Router();

// GET all zones
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new zone
router.post('/', async (req, res) => {
  try {
    console.log('Incoming zone:', req.body); // 🔍 DEBUG

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Zone name is required' });
    }

    const zone = new Zone({
      name,
      description: description || ''
    });

    await zone.save();
    res.json(zone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
