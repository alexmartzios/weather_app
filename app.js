const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//serving the CCS and JS files.
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log('Running on port 3000.');
});