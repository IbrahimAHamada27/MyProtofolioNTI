const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true }
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', CertificateSchema);

// Get all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Create a certificate
router.post('/', async (req, res) => {
  try {
    const result = await Certificate.collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create certificate' });
  }
});

// Update a certificate
router.put('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    res.json(certificate);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update certificate' });
  }
});

// Delete a certificate
router.delete('/:id', async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

module.exports = router;
