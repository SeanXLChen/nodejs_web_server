const express = require('express');  // import express
const app = express();   // just a convention to use app as the name of the express instance
const path = require('path');
const PORT = process.env.PORT || 3500;  // set the port to 3500

// basic route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));