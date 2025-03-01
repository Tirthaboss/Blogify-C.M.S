const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Blogify' });
});

module.exports = router;
