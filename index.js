const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

//app.use(express.static(__dirname + '/public'));

//app.get('/', (req, res) => res.send('psassa'));
app.get('/', (req, res) => res.sendFile(__dirname + 'index.html'));

app.listen(PORT, () => console.log(`Listening on 5000 mofos`));