// 'npm run dev' to start the server (dev) and 'npm run start' to start the production server
const express = require('express');  // import express
const app = express();   // just a convention to use app as the name of the express instance
const path = require('path');
const logEvents = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;  // set the port to 3500

// // basic route
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// custom middleware to log the request method, url, ip, and path
// custom middleware need a third argument, next, to pass control to the next matching route
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`Time: ${Date.now()}\n Method: ${req.method}\n URL: ${req.url}\n IP: ${req.ip}\n PATH = ${req.path}\n`);
    next(); // next() is a function that passes control to the next matching route
});

// built-in middleware to handle urlencoded data
// in other words, form data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware to handle json data
// 'content-type': 'application/json'
app.use(express.json());

// built-in middleware to serve static files
// 'content-type': 'text/html', 'text/css', 'image/png', etc.
// for example, http://localhost:3500/img/img1.jpg will access the img1.jpg file in the img folder inside /public
app.use(express.static(path.join(__dirname, '/public')));

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

// Route handlers (1st way to chain multiple functions)
app.get('/hello', (req, res, next) => {   
    console.log('Attempting to say hello');
    next(); // next() is a function that passes control to the next matching route
}
, (req, res) => {
    res.send('World');
});

// Route handlers (2nd way to chain multiple functions)
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain', [one, two, three]);

// express is waterfall, so the order of the routes matters
// route to serve the 404 page (http://localhost:3500/anything-else)
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));