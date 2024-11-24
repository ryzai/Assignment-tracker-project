import express from 'express';
import Assignment from '../models/assignment.js';  // Ensure this path is correct
const router = express.Router();
import methodOverride from 'method-override';

// Middleware for handling PUT and DELETE methods in forms
router.use(methodOverride('_method'));

// GET route to show the form for adding a new assignment
router.get('/add', (req, res) => {
  res.render('add');  // Ensure 'add.ejs' is in the 'views' directory
});

// POST route to create a new assignment
router.post('/', async (req, res) => {
  const { title, subject, dueDate, status, priority } = req.body;

  try {
    const newAssignment = new Assignment({
      title,
      subject,
      dueDate,
      status,
      priority,
    });

    // Save the new assignment to the database
    await newAssignment.save();
    res.redirect('/');  // Redirect to the homepage (or to the list of assignments)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating assignment');
  }
});

// GET route to show the edit form for a specific assignment
router.get('/edit/:id', async (req, res) => {
  try {
    // Find the assignment by ID
    const assignment = await Assignment.findById(req.params.id);

    // If the assignment is not found, redirect to the list of assignments
    if (!assignment) {
      return res.redirect('/');
    }

    // Render the edit form and pass the assignment data
    res.render('edit', { assignment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading assignment for edit');
  }
});

// PUT route to update an existing assignment
router.put('/:id', async (req, res) => {
  const { title, subject, dueDate, status, priority } = req.body;

  try {
    // Find the assignment by ID and update it with the new data
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { title, subject, dueDate, status, priority },
      { new: true }  // Return the updated document
    );

    // If the assignment is not found, redirect to the list of assignments
    if (!updatedAssignment) {
      return res.redirect('/');
    }

    // Redirect to the updated assignment page (or back to the list)
    res.redirect(`/`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating assignment');
  }
});

// Route to delete an assignment
router.delete('/delete/:id', async (req, res) => {
  try {
    // Delete the assignment by ID
    await Assignment.findByIdAndDelete(req.params.id);

    // Redirect back to the assignments list
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting assignment');
  }
});

export default router;
