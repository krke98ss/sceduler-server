const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



module.exports = () => {
  passport.use(
    new GoogleStrategy({
      
    })
  )
}