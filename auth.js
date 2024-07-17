const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person=require('./models/person');


passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      try {
        // console.log("received credentials", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
          return done(null, false, { message: "usernot found" });
        }
        const isPassword = await user.comparePassword(password);
        if (isPassword) {
          return done(null, user);
        } else {
          return done(null, false, { message: "usernot found" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );
  module.exports=passport;