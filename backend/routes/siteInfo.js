const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const SiteInfoSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroDesc: { type: String, required: true },
  aboutTitle: { type: String, required: true },
  aboutDesc1: { type: String, required: true },
  aboutDesc2: { type: String },
  academicTitle: { type: String, required: true },
  academicDesc: { type: String },
  philosophyTitle: { type: String },
  philosophyDesc: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  profileImage: { type: String },
  logoImage: { type: String },
  brandDesc: { type: String },
  contactTitle: { type: String },
  contactSubtitle: { type: String },
  contactEmail: { type: String },
  emailProvider: { type: String },
  emailjsServiceId: { type: String },
  emailjsTemplateId: { type: String },
  emailjsPublicKey: { type: String },
  formspreeUrl: { type: String },
  web3formsAccessKey: { type: String }
}, { timestamps: true });

const SiteInfo =mongoose.model('SiteInfo', SiteInfoSchema);

router.get('/', async (req, res) => {
  try {
    let siteInfo = await SiteInfo.findOne();
    if (!siteInfo) {
      // Create default if it doesn't exist
      siteInfo = new SiteInfo({});
      await siteInfo.save();
    }
    res.json(siteInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch site info' });
  }
});

router.post('/', async (req, res) => {
  try {
    let siteInfo = await SiteInfo.findOne();
    if (!siteInfo) {
      siteInfo = new SiteInfo(req.body);
      await siteInfo.save();
    } else {
      siteInfo = await SiteInfo.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    }
    res.json(siteInfo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update site info' });
  }
});


router.put('/', async (req, res) => {
  try {
    let siteInfo = await SiteInfo.findOne();
    if (!siteInfo) {
      siteInfo = new SiteInfo(req.body);
      await siteInfo.save();
    } else {
      siteInfo = await SiteInfo.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    }
    res.json(siteInfo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update site info' });
  }
});

module.exports = router;
