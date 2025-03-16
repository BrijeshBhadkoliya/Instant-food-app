module.exports = (req, res, next) => {
    res.locals.success_msg = req.session.success_msg || null;
    res.locals.error_msg = req.session.error_msg || null;
    res.locals.warning_msg = req.session.warning_msg || null;
    res.locals.info_msg = req.session.info_msg || null;

    delete req.session.success_msg;
    delete req.session.error_msg;
    delete req.session.warning_msg;
    delete req.session.info_msg;

    next();
};