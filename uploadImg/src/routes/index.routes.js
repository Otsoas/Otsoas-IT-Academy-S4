//
// we require path
const path = require('path');
//* We require the Router method of express
//* allows creating routes //// no longer will app.get ('/') be used, but router.get ('/')
const {
  Router
} = require('express');
// call
const router = Router();

//TODO Routes
router.get('/', (req, res) => {
  //  .render because we use the ejs (template engine)
  res.render('index');
});

//* we indicate the path where we will save the image
//* as a second parameter we add what the middleware was
router.post('/upload', (req, res) => {
  console.log(req.file); // show by console what has been uploaded, it is an object
  res.send('Image received correctly');
});


module.exports = router;