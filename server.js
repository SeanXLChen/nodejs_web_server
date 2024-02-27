// 'npm run dev' to start the server (dev) and 'npm run start' to start the production server
const express = require('express');  // import express
const app = express();   // just a convention to use app as the name of the express instance
const path = require('path');
const PORT = process.env.PORT || 3500;  // set the port to 3500

// // basic route
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// route to serve the index.html file (http://localhost:3500)
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // use path.join to make it easier to concatenate paths
});

// route to serve the new-page.html file (http://localhost:3500/new-page)
app.get('/new-page', (req, res) => {
    // res.sendFile('./views/new-page.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// route to redirect to the new-page.html file (http://localhost:3500/old-page)
app.get('/old-page', (req, res) => {
    res.redirect(301, '/new-page'); // default status code is 302, pass in 301 as the second argument to change it
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));