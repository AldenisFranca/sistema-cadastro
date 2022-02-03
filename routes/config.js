
module.exports = function(app){

    var indexRouter = require('./index');
    var funcionariosRouter = require('./funcionarios');
    var loginRouter = require('./login');

    let middlewareAutorization = function (req, resp, next){
        if (req.isAuthenticated()) return next()
        else resp.redirect('/login')
    }

    app.use('/', indexRouter);
    app.use('/funcionarios', middlewareAutorization, funcionariosRouter);
    app.use('/login', loginRouter);

}