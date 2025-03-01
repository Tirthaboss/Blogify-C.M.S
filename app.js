const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (EJS in this example)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load Plugins Dynamically
const pluginsDir = path.join(__dirname, 'plugins');
fs.readdirSync(pluginsDir).forEach(folder => {
  const pluginPath = path.join(pluginsDir, folder, 'plugin.js');
  if (fs.existsSync(pluginPath)) {
    const plugin = require(pluginPath);
    if (plugin && typeof plugin.init === 'function') {
      plugin.init(app);
      console.log(`Loaded plugin: ${plugin.name}`);
    }
  }
});

// Define Routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Blogify CMS is running on port ${port}`);
});
