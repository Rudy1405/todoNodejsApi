
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const config = require('../config/config')
const base64Img = require('base64-img')
const path = require('path')

var sendJSONresponse = function (res, status, content) {
  res.status(status).json(content)
}

//  Generate jwt
function generateToken(user) {
  return jwt.sign(user, config.secret, {})
}

//  Set user info from request
function setUserInfo(user) {
  let getUserInfo = {
    _id: user._id,
    email: user.email,
    role: user.role,
    name: user.name, 
    profilePicture: user.profilePicture
  }

  return getUserInfo
}

/*
 * Login route /auth/login
 */
function login(req, res, next) {
  console.log(req.user)
  let userInfo = setUserInfo(req.user)

  sendJSONresponse(res, 200, {
    token: generateToken(userInfo),
    user: userInfo
  })
}

/*
 *  Register route /auth/register
 */
function register(req, res, next) {
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  const role = req.body.role

  //  Return error if no email provided
  if (!email) {
    sendJSONresponse(res, 422, {
      error: 'Es necesario ingresar un email'
    })
    return
  }
  //  Return error if full name not provided
  if (!name) {
    sendJSONresponse(res, 422, {
      error: 'Es necesario ingresar nombre'
    })
    return
  }
  //  Return error if no password provided
  if (!password) {
    sendJSONresponse(res, 422, {
      error: 'Por favor establece una contraseña'
    })
    return
  }

  User.findOne({email: email}, (err, existingUser) => {
    if (err) {
      return next(err)
    }
    //  If user is not unique, return error
    if (existingUser) {
      sendJSONresponse(res, 422, {
        error: 'This email is alredy registered.',
        status: false
      })
      return
    }
    let user = new User({
      email: email,
      name: name,
      password: password,
      role: role
    })

    if (req.body.image) {
      let fileName = Date.now()
      let filepath = base64Img.imgSync(
        req.body.image,
        path.join("/public/images", "user"),
        fileName
      );
      user.image = "/images/user/" + fileName + path.extname(filepath)
    }

    user.save((err, user) => {
      if (err) {
        return next(err)
      }

      let userInfo = setUserInfo(user)

      sendJSONresponse(res, 201, {
        token: generateToken(userInfo),
        user: userInfo
      })
    })
  })
}


module.exports = {
  login,
  register
}