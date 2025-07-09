const Candidate = require('../models/Candidate');
const asyncHandler = require('express-async-handler');
const { validateCandidate } = require('../model-validation/candidateValidation');

exports.createCandidate = asyncHandler(async (req, res) => {
  const { name, email, phone, jobTitle } = req.body;
  // Build a full URL for resumeUrl if file is uploaded
  let resumeUrl = '';
  if (req.file) {
    resumeUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
  }
  // Validate candidate data AFTER setting resumeUrl
  const { error } = validateCandidate({ name, email, phone, jobTitle, resumeUrl });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const candidate = new Candidate({ name, email, phone, jobTitle, resumeUrl });
  await candidate.save();
  res.status(201).json(candidate);
});

exports.getCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find();
  res.status(200).json(candidates);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  res.status(200).json(candidate);
});

exports.deleteCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const candidate = await Candidate.findByIdAndDelete(id);
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  res.status(200).json({ message: 'Candidate deleted' });
});