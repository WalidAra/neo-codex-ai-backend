import passport from "passport";

const googleAuthScope = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export default googleAuthScope;
