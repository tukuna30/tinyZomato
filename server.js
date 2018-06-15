const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use('/dist', express.static(path.join(__dirname, 'dist')));
let options = {
  key: fs.readFileSync((process.env.HOME || process.env.USERPROFILE) + '/.ssh/server.key'),
  cert: fs.readFileSync((process.env.HOME || process.env.USERPROFILE) + '/.ssh/server.crt')
};
let https = require('https').createServer(options, app);
const port = process.env.PORT || 3000;
https.listen(port, () => console.log(`Server running on port ${port}`));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});