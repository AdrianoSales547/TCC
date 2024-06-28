const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do Sequelize para conectar ao banco de dados MySQL
const sequelize = new Sequelize('escola', 'Admin', 'Ceub123@', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definição do modelo Aluno com os nomes das colunas corretos
const Aluno = sequelize.define('Aluno', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bloco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    armario: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false // Desativa a criação automática das colunas createdAt e updatedAt
});

// Sincronização do modelo com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar modelos:', err);
    });

// Rota para servir o index.html (opcional)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/cadastrar', async (req, res) => {
    const { nome, email, ra, bloco, armario } = req.body;

    try {
        const aluno = await Aluno.create({
            nome,
            email,
            ra,
            bloco,
            armario, // Adiciona o número do armário ao cadastro do aluno
        });

        res.status(200).json({ message: 'Aluno registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        res.status(500).json({ message: 'Erro ao cadastrar aluno' });
    }
});

app.put('/atualizar-armario', async (req, res) => {
    const { ra, numeroArmario } = req.body;

    try {
        const aluno = await Aluno.findOne({ where: { ra } });
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        aluno.armario = numeroArmario;
        await aluno.save();

        res.status(200).json({ message: 'Cadastro atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cadastro:', error);
        res.status(500).json({ message: 'Erro ao atualizar cadastro' });
    }

    app.delete('/liberar-armario', async (req, res) => {
        const { ra } = req.body;
    
        try {
            const aluno = await Aluno.findOne({ where: { ra } });
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }
    
            await aluno.destroy();
    
            res.status(200).json({ message: 'Armário liberado e cadastro atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao liberar armário:', error);
            res.status(500).json({ message: 'Erro ao liberar armário' });
        }
    });
    
});

module.exports = app;
