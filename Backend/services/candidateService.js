const Candidate = require('../models/Candidate');

exports.createCandidate = async ({ name, email, phone, jobTitle, resumeUrl }) => {
  const candidate = new Candidate({ name, email, phone, jobTitle, resumeUrl });
  return await candidate.save();
};

exports.getAllCandidates = async () => {
  return await Candidate.find();
};

exports.updateCandidateStatus = async (id, status) => {
  return await Candidate.findByIdAndUpdate(id, { status }, { new: true });
};

exports.deleteCandidateById = async (id) => {
  return await Candidate.findByIdAndDelete(id);
};