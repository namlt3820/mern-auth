const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// Setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) return done(err, false);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Setup options for jwt strategy
const localOptions = {
    usernameField: 'email',
};

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false
    User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);

        // Compare plain text password to the salted, hashed version in db
        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
            console.log('isMatch');
            return done(null, user);
        });
    });
});

// Tell passport to use strategies
passport.use(jwtLogin);
passport.use(localLogin);
