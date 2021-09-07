const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


//* creation of user.json//////////////
const person = {
  name: 'Yoda',
  age: 22,
  url: ''
}
//todo ROUTE
//main route
app.get('/', function (req, res) {
  console.log('A ver si esto esta bien')
  res.send('A ver si esto esta bien')
});

//user route
app.get('/user', function (req, res) {
  person.url = req.protocol + '://' + req.get('host') + req.originalUrl
  res.send(
    person
  )
  console.log(`name: ${person.name} age: ${person.age} url: ${person.url}`)
});


app.listen(port, () => {
  console.log(`The server is running on port 3000`);
})

//* URL//////
// https://www.codegrepper.com/code-examples/javascript/req.get%28%27host%27%29
// toda la url
//var todaUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
// http mas host url 
//const hostUrl = req.protocol + '://' + req.get('host');
//solo host url
//const soloHostUrl = req.get('host');

//* Conseguir URL 
//Fuente: https://www.iteramos.com/pregunta/20927/como-obtener-la-url-completa-en-expressjs
//El protocolo está disponible como req.protocol
//var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
// http://expressjs.com/en/api.html