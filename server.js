const express = require('express');
const hbs = require('hbs');
const multer  = require('multer')
const bodyParser  = require('body-parser')
var upload = multer({ dest: 'upload/' })
hbs.registerPartials(__dirname + '/views/partials');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', hbs);

app.get('/', (req, res) => {
    res.render('main.hbs', {
                size: "0 bytes.",
                name: "Undefined."
    });
});

app.post('/', upload.single('uploads'), (req, res, next) => {
  if (!req.file) {
    console.log("No file received");
    res.render('main.hbs', {
               size: "Error uploading file.",
               name: "Error uploading file."
    });
  } else {
    console.log('file received');

    res.render('main.hbs', {
               size: req.file.size + " bytes.",
               name: req.file.originalname
    });
  }
});

app.listen(port,() => {
    console.log("Server is up on port " + port)
});