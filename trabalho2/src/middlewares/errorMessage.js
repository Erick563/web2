const errorMessage = (req, res, next) => {
    res.locals.errorMessage = req.flash('error');
    next();
};

module.exports = errorMessage;