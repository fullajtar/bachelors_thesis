//In our example we'll be using one script to keep this simple. Let's import the required libraries in our app.js file:
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//Now, we can configure express-handlebars as our view engine:
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

//To be able to reach this page, we need to configure a request handler. Let's set it at the root path:
app.get('/', (req, res) => {
    res.render('home');
});

//Finally, we just need to start listening on a port for requests:
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

app.use(express.static(__dirname + '/public'));