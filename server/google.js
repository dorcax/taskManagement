











const passport = require("passport")
const cookieSession = require("cookie-session")
const session = require("express-session")
const GoogleStrategy = require("passport-google");

// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["cookie-key"]
}))
app.use(passport.initialize())
app.use(passport.session())


passport.serializeUser((user, done) => {
    done(null, user.googleid) // check here if you run to issues
})
passport.deserializeUser((id, done) => {
    getUser(id).then(currentUser => {
        done(null, currentUser[0])
    })
})



app.get("/login", passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get("/googleRedirect", passport.authenticate('google'), (req, res) => {
    res.redirect("/")
})
passport.use(
    new GoogleStrategy(
      {
        callbackUrl: "/googleRedirect",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        const {
          id: googleId,
          given_name: firstName,
          family_name: lastName,
          email,
        } = profile;
        const user = {
          googleId,
          name: `${firstName} ${lastName}`,
          email,
          provider: AuthPro,
        };
  
        getUser(googleId).then((currentUser) => {
          currentUser;
  
          if (currentUser.length) {
            done(null, currentUser[0]);
          } else {
            createUser(user);
            getUser(googleId).then(newUser => {
              newUser;
              done(null, newUser[0])
            }).catch(err => console.log(err))
          }
        });
      }
    )
  );