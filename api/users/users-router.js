// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const mw = require("../auth/auth-middleware.js")
// - [ ] `[GET] /api/users`
// - [ ] `[POST] /api/auth/register`
// - [ ] `[POST] /api/auth/login`
// - [ ] `[GET] /api/auth/logout`

const router = require('express').Router()
const Users = require('./users-model.js')

router.get('/',  (req,res,next)=>{
  res.json({message: "hi!"})
})

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router