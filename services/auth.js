

module.exports = function(passport){
    const bcrypt = require('bcryptjs');
    const operations = require('../database/dao');
    const LocalStrategy = require('passport-local').Strategy
    const dao_login = require('../database/dao_login');
    
    passport.serializeUser(function (user, done){
        done(null, user.id)
      })
      
      passport.deserializeUser(function (id, done){
        dao_login.findById(id)
        .then( ([rows]) => {
          let user = rows[0]
          return done(null, user)
        }).catch( err => {
          return done(err, null)
        })
      })
      
      let strategyConfig = {
        usernameField: 'username',
        passwordField: 'password'
      }
      passport.use(new LocalStrategy(strategyConfig, function (username, password, done){
      
        dao_login.findByUsername(username)
        .then( ([rows]) => {
          if (rows.length == 0) return done(null, false)
      
          let user = rows[0]

          if (bcrypt.compareSync(password, user.password)) return done(null, user) 
          else return done(null, false)
        }).catch( err => {
          console.log(err)
          return done(err, null)
        })
        
      }))

}