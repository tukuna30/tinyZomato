const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use('/dist', express.static(path.join(__dirname, 'dist')));

let http = require('http').createServer(app);
const port = process.env.PORT || 3000;
http.listen(port, () => console.log(`Server running on port ${port}`));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});