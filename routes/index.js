//Home-Page Display
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Assignment Tracker' });
});

module.exports = router;
