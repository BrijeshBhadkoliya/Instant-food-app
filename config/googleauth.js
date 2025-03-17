const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Admin = require("../model/adminschema");
const User = require("../model/usermodel");

require('dotenv').config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
          const email = profile._json.email;

        
          let admin = await Admin.findOne({ email });
          if (admin) {
              console.log(" Admin Logged In");
              return done(null, { id: admin.id, type: "admin" });
          }

          let user = await User.findOne({ email });
          if (user) {
              console.log("User Logged In");
              return done(null, { id: user.id, type: "user" });
          }

          console.log("User not found");
          return done(null, false);

      } catch (error) {
          return done(error, null);
      }
  }
  )
);


passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: user.type });  
});

passport.deserializeUser(async (any, done) => {
  try {
      if (any.type === "admin") {
          const admin = await Admin.findById(any.id);
          return done(null, admin);
      } else {
          const user = await User.findById(any.id);
          return done(null, user);
      }
  } catch (error) {
      return done(error, null);
  }
});