import express from 'express';
import Assignment from '../models/assignment.js';

const router = express.Router();

// Display the list of assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.render('index', { assignments });
  } catch (error) {
    res.status(500).send('Error fetching assignments');
  }
});

export default router;
