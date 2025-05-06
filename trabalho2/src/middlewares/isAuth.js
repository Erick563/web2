const isAuth = (req, res, next) => {
    const isAuthenticated = req.session && req.session.user;
    if (isAuthenticated) {
        next();
    } else {
        req.flash('error', 'Acesso não autorizado. Faça login para continuar.');
        return res.redirect('/');
    }
};

module.exports = isAuth;