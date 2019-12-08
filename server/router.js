const { signin, signup } = require('./controllers/authentication');
require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
    app.post('/signup', signup);
    app.get('/', requireAuth, (req, res) => {
        res.send("You're authenticated");
    });
    app.post('/signin', requireSignin, signin);
};
