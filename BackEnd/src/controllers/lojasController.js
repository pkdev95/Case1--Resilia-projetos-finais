const LojasDAO = require('../DAO/LojasDAO')

class lojasController {
    static rotas(app){
        // Rotas para os recursos lojas. O endpoint das rotas aparece na primeira parte entre aspas. O que vem depois são os métodos que trabalharão com as requisições.
        app.get('/loja', lojasController.listar)
        app.post('/loja', lojasController.inserir)
        app.delete('/loja/:id', lojasController.deletar)
        app.put('/loja/:id', lojasController.atualizar)
    }

    // GET
    static async listar(req, res){
        const endereco = await LojasDAO.listar()
        
        // Devolve a lista de lojas e o status code 200, quer dizer que a requisição foi bem sucedida.
        res.status(200).send(endereco)
    }


    //inserir
    static async inserir(req, res){
       
        const loja = {
            endereco: req.body.endereco,
            telefone: req.body.telefone,
            email: req.body.email

    
        }
   
        const result = await LojasDAO.inserir(loja)

       
        res.status(201).send({result})
       
    }
   
    // DELETE
    static async deletar(req, res) {
        // Envia a constante id do usuário para LojasDAO.deletar.
        const endereco = await LojasDAO.deletar(req.params.id)

        // Se o livro não for encontrado, devolve um erro staus code 500.
        if(endereco.erro){
            res.status(500).send({'Mensagem': 'Erro ao deletar o endereço'})
            return
        }

        res.status(200).send({mensagem: 'Endereço removido com sucesso'})
    }

    // PUT --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Endereço" atualizado com sucesso" }
    static async atualizar(req, res){
        const endereco = {
            endereco: req.body.endereco
           
        }

        const result = await LojasDAO.atualizar(req.params.id, endereco)

        if(result.erro){
            res.status(500).send('Erro ao atualizar o endereço')
            return
        }

        res.status(200).send({mensagem: 'Endereço atualizado com sucesso', "endereço: ": endereco})
    }
}

// Exportação da Classe "LojasController"
module.exports = lojasController