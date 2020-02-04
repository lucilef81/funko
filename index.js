const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config({ path: require('find-config')('.env') })

const app = express();

// Load routes

const funko = require('./controllers/funko');

mongoose.Promise = global.Promise;
console.log(process.env.MONGO_URI)

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//Handlebars middleware
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder

app.use(express.static(path.join(__dirname, 'public')));

// Middleware express session
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

//Use routes

app.use('/', funko);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
