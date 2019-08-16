const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const db = require('./db');

const catalogRoutes = require('./routes/catalogRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(
    session({
        secret: 'My secret key',
        resave: true,
        saveUninitialized: true
    })
);

db.connect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/', [catalogRoutes, profileRoutes]);
app.get('/*', (req, res) => {
    res.redirect('/');
});

app.listen(8080, () => console.log('Listening on port 8080'));
