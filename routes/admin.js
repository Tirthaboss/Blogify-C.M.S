const express = require('express');
const router = express.Router();

// Admin dashboard
router.get('/', (req, res) => {
  res.render('admin', { title: 'Admin Dashboard' });
});

// Example: Manage posts
router.get('/posts', (req, res) => {
  // Here you would retrieve posts from the database
  res.render('admin-posts', { title: 'Manage Posts' });
});

module.exports = router;
