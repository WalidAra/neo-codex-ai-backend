import passport from "passport";

const googleAuthSession = passport.authenticate("google", { session: false });

export default googleAuthSession;
