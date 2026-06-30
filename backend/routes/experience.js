const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  years: { type: String, required: true },
  desc: { type: String, required: true }
}, { timestamps: true });

const Experience =mongoose.model('Experience', ExperienceSchema);

// Get all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// Create an experience
router.post('/', async (req, res) => {
  try {
    const result = await Experience.collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create experience' });
  }
});

// Update an experience
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update experience' });
  }
});

// Delete an experience
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

module.exports = router;
