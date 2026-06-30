const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

const Message =mongoose.model('Message', MessageSchema);

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Create a message
router.post('/', async (req, res) => {
  try {
    const result = await Message.collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save message' });
  }
});

// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
