// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { add, findBy } = require('../users/users-model.js')

//add middlewares here for 
router.post('/register', (req,res,next)=>{
  const {username, password} = req.body

  const hash = bcrypt.hashSync(password, 8)

  add({ username, password: hash})
  .then(user=>{
    res.status(201).json(user)
  })
  .catch(next)

})

//loggin in pulls username and password from request body, and then checking whether the username exists in the database and then checking if the password is a match.
router.post('/login', async (req,res,next)=>{
  const {username, password} = req.body
  //step 1 - find user using username
  
  
  //going to be an array with the user that we want in first position. 
  const [user] = await findBy({username}) //passing in username of the username which comes in from the request. 
  //step 2 - if user found ,check hash
  if(user && bcrypt.compareSync(password, user.password)){ //compares the plain text password to the hash.
    // the good path, where we save the session
    // step 3 - if password good ,save session. 
    res.json({message: `welcome back ${username}`})
  }else{
    next({status:401, message: "unauthorized"})
  }
  })

router.get('/logout', (req,res,next)=>{
  res.json("logout")
})
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;