const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

exports.signup = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(422)
            .send({ error: 'You must provide email and password' });

    User.findOne({ email }, (err, existingUser) => {
        if (err) return next(err);

        if (existingUser)
            return res.status(422).send({ error: 'Email is in use' });

        const user = new User({ email, password });
        user.save(err => {
            if (err) return next(err);
            res.json({ token: tokenForUser(user) });
        });
    });
};

exports.signin = (req, res, next) => {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
};
