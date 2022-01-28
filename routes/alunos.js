var express = require('express');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');

var router = express.Router();
var dao = require('../database/dao');

router.get('/', function(request, response, next){
    dao.list().then(([rows]) => {
        response.render('alunos/list',{ alunos: rows})
    }).catch(err => {
        console.log(err)
        response.render('alunos/list', { alunos: [] })
    });
})

router.post('/delete', function(request, response){ 
    dao.remove(request.body.id)
    .then(([result]) => {
        console.log(result)
        if (result.affectedRows > 0)
            request.flash('success', 'Aluno excluído com sucesso.')
        else
            request.flash('success', `Não foi encontrado no banco de dados o aluno com id = ${request.body.id}`)
        response.redirect('/alunos')
    }).catch(err => {
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusão do aluno.')
        response.redirect('/alunos')
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
    
    response.render('alunos/form', {aluno: row})
});

router.post('/save', function(request, response) {

    if (request.body.id){
        operacao = dao.update
        success = `Dados do aluno atualizados com sucesso.`
    }else{
        operacao = dao.save
        success = `Aluno cadastrado com sucesso.`
    }

    operacao(request.body)
    .then(([result]) => {
        request.flash('success', success)
        response.redirect('/alunos')
    }).catch(err => {
        console.log(err)
        request.flash('error', `Não foi possível cadastrar o aluno.`)
        response.redirect('/alunos')
    })
});

router.get('/search', function(request, response){

if (request.query.nome){
    dao.search(request.query.nome)
    .then(([rows]) => {
        response.render('alunos/list', { alunos: rows})
    }).catch( err =>{
        console.log(err)
        request.flash('error', 'Não foi possível efetuar a busca por nome.')
        response.redirect('/alunos')
    })
}else{
    response.redirect('/alunos')
}

});

module.exports = router