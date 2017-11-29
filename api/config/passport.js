
const passport = require('passport')
const User = require('../models/userModel')
const config = require('./config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
//  Setting username field to email rather than username
const localOptions = {
    usernameField: 'email',
    passwordField: 'password'
  }
  
  // Setting up local login Strategy
  const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {
            error: 'Usuario no encontrado en la BD'
          })
      } else {
        user.comparePassword(password, function (err, isMatch) {
          if (err) {
            return done(err)
          }
          if (!isMatch) {
            return done(null, false, {
              error: 'Password incorrecta, alv!'
            })
          }
  
          return done(null, user)
        })
      }
    })
  })


  //  Setting JWT strategy options
const jwtOptions = {
    //  Telling Passport to check authorization headers for jwt
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //  Telling passport where to find the secret
    secretOrKey: config.secret
  }
  
  const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload._id, (err, user) => {
      if (err) {
        return done(err, false)
      }
  
      if (user) {
        done(null, user)
      }
    })
  })
  
  passport.use(jwtLogin)
  passport.use(localLogin)