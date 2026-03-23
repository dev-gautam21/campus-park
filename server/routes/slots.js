import express from 'express';
import Slot from '../models/Slot.js';

const router = express.Router();

// GET all slots
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new slot
router.post('/', async (req, res) => {
  try {
    const slot = new Slot(req.body);
    await slot.save();
    res.json(slot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
