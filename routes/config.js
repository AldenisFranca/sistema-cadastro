
module.exports = function(app){

    var indexRouter = require('./index');
    var alunosRouter = require('./alunos');
    var loginRouter = require('./login');

    let middlewareAutorization = function (req, resp, next){
        if (req.isAuthenticated()) return next()
        else resp.redirect('/login')
    }

    app.use('/', indexRouter);
    app.use('/alunos', middlewareAutorization ,alunosRouter);
    app.use('/login', loginRouter);

}