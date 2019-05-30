
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const app = express();
var googleProfile = {};

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
 },

    (accessToken, refreshToken, profile, cb) => {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName
        };
        cb(null, profile);
    }
))

//app routes

app.get('/', (req, res ,next) => {
    res.render('index', { user: req.user });
})

app.get('/logged', (req, res, next) => {
    res.render('logged', { user: googleProfile });
})

// passport routes

app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/logged',
    failureRedirect : '/'
}))

app.listen(3000);

app.use((req, res, next) => {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
})