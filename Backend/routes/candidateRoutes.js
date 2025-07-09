const express = require('express');
const router = express.Router();
const { createCandidate, getCandidates, updateStatus, deleteCandidate } = require('../controllers/candidateController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/', protect, upload.single('resume'), createCandidate);
router.get('/', protect, getCandidates);
router.put('/:id/status', protect, updateStatus);
router.delete('/:id', protect, deleteCandidate);

module.exports = router;