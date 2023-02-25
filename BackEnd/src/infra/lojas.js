// Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado.

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Lojas

// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const LOJAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "LOJAS" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "endereco" varchar(90),
    "telefone" INTEGER,
    "email" varchar(90)
);`;


// Função responsável por criar a tabela "Lojas" no banco de dados SQLite. O callback verifica se ocorreu algum erro durante a execução da operação e, em caso positivo, imprime uma mensagem de erro no console.
function createTableLojas() {
    db.run(LOJAS_SCHEMA, (error)=> {
      if (error) console.log("Erro ao criar tabela de lojas");
    });
}


// Funções executadas de forma síncrona, uma após a outra, dentro da função serialize(). Ao final da execução dessas funções, o banco de dados estará criado e populado com as informações fornecidas.
db.serialize( ()=> {
    createTableLojas();
    
});