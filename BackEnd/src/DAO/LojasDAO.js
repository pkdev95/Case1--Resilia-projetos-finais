// Importação do arquivo "db.js"
const db = require("../infra/db");

// Essa classe encapsula o acesso ao Banco de Dados.
class LojasDAO {

    // GET  --  Função ALL - Retorna todas as linhas.
    static listar() {
        const query = 'SELECT * FROM LOJAS';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }

    static inserir(lojas) {
        const query = 'INSERT INTO LOJAS (endereco, telefone, email) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
          db.run(query, [lojas.endereco, lojas.telefone, lojas.email], (err) => { 
            if (err) {
              reject(err);
            }
            resolve(lojas);
          });
        });
      }

   
    // DELETE -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Book deletado com sucesso" }
    static deletar(id) {
        const query = 'DELETE FROM LOJAS WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao deletar o endereço",
                        erro: err
                    });
                }
                resolve({ mensagem: "Endereço deletado com sucesso", id: id })
            });
        });
    }
    
    // PUT -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Book atualizado com sucesso" }
    static atualizar(id, loja) {
        const query = 'UPDATE LOJAS SET endereco = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [loja.endereco, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar o endereço",
                        erro: err,
                    });
                }
                resolve({ mensagem: "Endereço atualizado com sucesso" });
            });
        });
    }

}

// Exportação da classe
module.exports = LojasDAO
