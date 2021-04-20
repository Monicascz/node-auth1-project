const dbConfig = require("../../data/db-config")

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req,res,next) {
  //job is to check if req.session.user is there. 
if(req.session.user){ //the beauty of this line is that this line does everything.
  //the test fails if there is no cookie, if the cookie is invalid, if the cookie is expired, if there is no user in the sessions array with a session corresponding to the cookie,...
  next()
}else{
  next({"message": "You shall not pass!"})
}
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree(req,res,next) {
  const {username} = req.body
  //  if(username===){}

}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req,res,next) {
  const {password}=req.body
  if (!password || password.length <= 3){
    res.status(422).json({message:"Password must be longer than 3 chars"})
  }else{
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports={
  restricted,
  checkUsernameExists,
  checkUsernameFree,
  checkPasswordLength
}