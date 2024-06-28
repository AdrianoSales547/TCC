const { Sequelize, DataTypes } = require('sequelize');

// Configuração do Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize('escola', 'Admin', 'Ceub123@', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definição do modelo Aluno
const Aluno = sequelize.define('Aluno', {
    name: {
        type: DataTypes.STRING,
        allowNull: false // Garante que o campo 'name' não pode ser nulo
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false // Garante que o campo 'email' não pode ser nulo
    },
    ra: {
        type: DataTypes.STRING,
        allowNull: false // Garante que o campo 'ra' não pode ser nulo
    },
    block: {
        type: DataTypes.STRING,
        allowNull: false // Garante que o campo 'block' não pode ser nulo
    }
});

module.exports = Aluno;
