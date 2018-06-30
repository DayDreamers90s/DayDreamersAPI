var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;
var GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var User = require('../api/users/userModel');
var configAuth = require('../config/config');


module.exports = function(passport){
        passport.serializeUser(function(user,done){
            done(null,user)
        })

        passport.deserializeUser(function(user,done){
            done(null,user)
        })

    passport.use('jwt', new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt'),
            secretOrKey   : configAuth.secrets.jwt
        },
        function (jwtPayload, cb) {     
            console.log('inside this');     
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            console.log(jwtPayload.sub);
            return User.findOne(jwtPayload.sub)
                .then(user => {
                    user.local.password = null;
                    return cb(null, user);
                })
                .catch(err => {
                    err.name = "UnauthorizedError";
                    return cb(err);
                });
        }
    ));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password'
        //passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(email, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                console.log("User: "+ user);

                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {message: 'No user found.'});

                if (!user.comparePassword(password,user.local.password))
                    return done(null, false, {message: 'Oops! Wrong password.'});

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password'
       // passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(email, password, done) {

        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local.email': email}, function(err, existingUser) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser) 
                    return done(null, false, {message: 'That email is already taken.'});

                // //  If we're logged in, we're connecting a new local account.
                // if(req.user) {
                //     var user            = req.user;
                //     user.local.email    = email;
                //     user.local.password = user.hashPassword(password);
                //     user.save(function(err) {
                //         if (err)
                //             throw err;
                //         return done(null, user);
                //     });
                // } 
                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();

                    newUser.local.email    = email;
                    newUser.local.password = newUser.hashPassword(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        });

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }
        });

    }));

   
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

};