const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

// connect DB
mongoose
  .connect(
    'mongodb+srv://bayenes:3LNmVUprnhPopklm@cluster0.mhemprp.mongodb.net/?retryWrites=true&w=majority'
  )
  .then((res) => console.log('connexted mongo atlas'))
  .catch((err) => console.log(err));

/* TEMPLATE ENGİNE */
app.set('view engine', 'ejs');

/* MIDDLEWARE */
app.use(express.static('public'));
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

/* ROUTES */
app.get('/', photoController.getAllPhotos);
app.get('/photo/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Server ${port} nolu portta çalışıyor...`);
});
