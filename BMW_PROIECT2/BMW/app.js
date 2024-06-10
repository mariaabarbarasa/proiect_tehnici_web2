var express = require('express');
var app = express(); //aplicatie care nu e pornita din express

const session = require('express-session');
const formidable = require('formidable');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
app.set("view engine",ejs);
app.use(session({
    secret:"abcd",
    resave:true,
    saveUninitialized:false
}));
app.use(express.static(__dirname));
// ruta pentru fisierul HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/data_ajax.html'));
});
app.get('/data_ajax', (req, res) => {
    fs.readFile(__dirname + '/data_ajax.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Eroare' });
      } else {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      }
    });
});
//pagina de eroare
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});
//pagina de login
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'BMW')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});
app.post('/login', (req, res) => {
  const { username, parola } = req.body;
  if (username === 'admin' && parola === 'password') {
    res.send('Login reusit');
  } else {
    res.send('Loginul nu a reusit');
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});