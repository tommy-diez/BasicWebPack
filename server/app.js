'use strict';
console.log(require('dotenv').config({path: '/Users/tommyd/BasicWebPack/.env'}));
const express = require('express');
const app = express();
const open = require("open");
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const authRouter = require('./auth');

var cors = require('cors');
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static('docs'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession(session));
app.use(cors());

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {

        return done(null, profile);
    }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use("/", authRouter);

app.get('/api/v1/cities', function(req, res) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '32000',
        user: 'root',
        password: 'root',
        database: 'citiesData'
    });
    connection.connect();

    connection.query('SELECT * FROM tblCitiesImport', function (err, rows, fields) {
        if (err) throw err;
        res.json({ "data": rows});
    });

    connection.end()
});

app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.NODEJS_IP || '127.0.0.1');

if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
}

app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
    open("http://localhost:8000");
});