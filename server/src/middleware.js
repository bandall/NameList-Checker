export const loginOnlyMiddleWare = (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    }
    else {
        return res.redirect("/login");
    }
}