const express = require('express');
const multer = require('multer');
//* ejs does not need to require it, although it can be done
//const ejs = require('ejs');
const path = require('path');

//TODO Initialization express
const app = express();

//TODO settings
//* we configure ejs
// whichever port is in the PORT environment variable, or 3000 if nothing is there.
app.set('port', process.env.PORT || 3000);
// We indicate where is the view folder that is from where ejs works
app.set('views', path.join(__dirname, 'views'));
// we configure here the ejs template engine
app.set('view engine', 'ejs');


//* we configure multer where we put the uploaded files and other options ...
//* Indicates how we want to save our uploaded file, different options
//* we equate it to a variable and pass it to the multer middleware to read it, and execute
const storage = multer.diskStorage({
  //* we indicate the route
  destination: path.join(__dirname, 'public/uploads'),
  //* indicates with what name we want to save it
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// //Todo middlewares
//* run before routes
//* put multer before routes (uses middleware) so you can understand and pass file to corresponding route here we process image in this case
// Multer Middlwares Creates the folder if doesn't exists
//* options are passed as objects
app.use(multer({
  storage: storage,
  dest: path.join(__dirname, 'public/uploads'),
  limits: {
    fileSize: 20000000 //* we can limit the size of the image 2 megabites
  },
  //* we specify the type of files that we accept we do it through a regular expression, there are other ways
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg/;
    // It checks the type of extension if it is allowed, .minetypes can be found in the object that returns us by console when we upload image
    const mimetype = filetypes.test(file.mimetype);
    // we compare it with the property of the object that corresponds to originalname and path.extname takes me only the extension
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: El archivo no es correcto');
  }
}).single('image')); //* the single indicates that we will only upload one image not many at a time

//TODO Routes
//* router file import
app.use(require('./routes/index.routes'));


//todo static files
//* so that what is in this folder can be seen from the browser, copying the file name into the browser
app.use(express.static(path.join(__dirname, 'public')))

//todo star server
app.listen(app.get('port'), () => {
  console.log(`Server in job on ${app.get('port')}`);
});