var express = require('express');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
var router = express.Router();
var dao = require('../database/dao');

router.get('/', function(request, response){
    dao.list().then(([rows]) => {
        response.render('funcionarios/list',{ funcionarios: rows})
    }).catch(err => {
        console.log(err)
        response.render('funcionarios/list', { funcionarios: [] })
    });
});

router.post('/delete', function(request, response){ 
    dao.remove(request.body.id)
    .then(([result]) => {
        console.log(result)
        if (result.affectedRows > 0)
            request.flash('success', 'Funcionário excluído com sucesso.')
        else
            request.flash('success', `Não foi encontrado no banco de dados o funcionário com id = ${request.body.id}`)
        response.redirect('/funcionarios')
    }).catch(err => {
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusão do funcionário.')
        response.redirect('/funcionarios')
    })
});

router.get('/form', async function(request, response){
    
    let row = {
        id: '',
        nome: '',
        email: '',
        curso: ''
    }
    if( request.query.id){
        [result] = await dao.findById(request.query.id)
        console.log(result)
        row = result[0]
        console.log(row)
    }
    
    response.render('funcionarios/form', {funcionario: row})
});

router.post('/save', function(request, response) {

    if (request.body.id){
        operacao = dao.update
        success = `Dados do funcionário atualizados com sucesso.`
    }else{
        operacao = dao.save
        success = `Funcionário cadastrado com sucesso.`
    }

    operacao(request.body)
    .then(([result]) => {
        request.flash('success', success)
        response.redirect('/funcionarios')
    }).catch(err => {
        console.log(err)
        request.flash('error', `Não foi possível cadastrar o funcionário.`)
        response.redirect('/funcionarios')
    })
});

router.post('/cancel', function(request, response) {
    response.redirect('/funcionarios');
  });

router.get('/search', function(request, response){

if (request.query.nome){
    dao.search(request.query.nome)
    .then(([rows]) => {
        response.render('funcionarios/list', { funcionarios: rows})
    }).catch( err =>{
        console.log(err)
        request.flash('error', 'Não foi possível efetuar a busca por nome.')
        response.redirect('/funcionarios')
    })
}else{
    response.redirect('/funcionarios')
}

});

module.exports = router