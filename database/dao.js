const pool = require('./config');

let operations ={
    list: function() {
        return pool.promise().query('select * from funcionarios')
    },
    findById(id) {
        return pool.promise().query('select * from funcionarios where id=?', [id]) 
    },
    save: function(funcionario){
        return pool.promise().execute('INSERT INTO funcionarios (nome,data_nasc,email,cargo) VALUES (?,?,?,?)', [funcionario.nome, funcionario.data_nasc, funcionario.email, funcionario.cargo])
    },
    update: function(funcionario){
        return pool.promise().execute('UPDATE funcionarios SET nome=?, data_nasc=?, email=?, cargo=? WHERE id=?', [funcionario.nome, funcionario.data_nasc, funcionario.email, funcionario.cargo, funcionario.id])
    },
    remove: function(id){
        return pool.promise().execute('delete from funcionarios where id = ?', [id])
    },
    search: function(nome){
        return pool.promise().query('select * from funcionarios where nome like ?', ['%'+nome+'%']) 
    }
}

module.exports = operations