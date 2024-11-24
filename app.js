import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

import indexRoutes from './routes/index.js';
import assignmentsRoutes from './routes/assignments.js'; // Import assignments routes

dotenv.config();
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRoutes);
app.use('/assignments', assignmentsRoutes); // Make sure this is registered

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
