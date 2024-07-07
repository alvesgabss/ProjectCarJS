const Sequelize = require('sequelize');
const db = require(__dirname + "/database.js");
const bcrypt = require('bcrypt');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: true // Altere conforme necessário
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: true // Altere conforme necessário
    },
    rua: {
        type: Sequelize.STRING,
        allowNull: true // Altere conforme necessário
    },
    numeroCasa: {
        type: Sequelize.STRING,
        allowNull: true // Altere conforme necessário
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true // Altere conforme necessário
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: true // Altere conforme necessário
    }
});

/* Precisamos criar um usuário padrão administrador do sistema,
 esse usuário terá acesso a menus especiais, como listar todos os usuários cadastrados no sistema
 alterar dados usuários e etc*/ 

User.sync().then(() => {
    // Verifica se não há nenhum usuário na tabela
    User.findOne().then(existingUser => {
        if (!existingUser) {
            // Se não houver nenhum usuário, cria um usuário padrão (administrador)
            const nomePadrao = 'Administrador';
            const loginPadrao = 'admin';
            const senhaPadrao = 'admin123';

            // Use bcrypt para criar um hash seguro da senha
            bcrypt.hash(senhaPadrao, 10, function (err, hash) {
                if (err) {
                    console.error('Erro ao criar hash de senha padrão', err);
                } else {
                    // Cria o usuário padrão
                    User.create({
                        nome: nomePadrao,
                        login: loginPadrao,
                        senha: hash,
                        cep: '12345-678',
                        bairro: 'Bairro Padrão',
                        rua: 'Rua Padrão',
                        numeroCasa: '123',
                        email: 'admin@example.com',
                        telefone: '123456789'
                    }).then(createdUser => {
                        console.log('Usuário padrão criado com sucesso', createdUser);
                    }).catch(error => {
                        console.error('Erro ao criar usuário padrão', error);
                    });
                }
            });
        }
    });
});

module.exports = User;