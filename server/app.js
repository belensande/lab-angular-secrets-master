const express        = require("express");
const path           = require("path");
const favicon        = require("serve-favicon");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const cors           = require("cors");
const authController = require("./routes/authController");
const session        = require("express-session");
const passport       = require("passport");

const app            = express();

// Passport configuration
require("./config/passport")(passport);

// Mongoose configuration
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/angular-authentication");

// Session
app.use(session({
  secret: "lab-angular-authentication",
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 2419200000 }
}));

const corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200,
	credentials: true
}

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("lab-angular-authentication"));

app.use('/api', authController);
app.all('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;
