require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const serverless = require('serverless-http');


const app = express();
const port = 3000;
const router = express.Router();

// Middleware para parsear o corpo das requisições
app.use(express.json());
app.use(cors());

// Configurações do banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// 1. Ler todos os itens da tabela produtos
router.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos_db', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Inserir um novo item na tabela produtos
router.post('/produtos', (req, res) => {
    const { produto, categoria, quantidade, preco, localizacao } = req.body;
    const query = 'INSERT INTO produtos_db (produto, categoria, quantidade, preco, localizacao) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [produto, categoria, quantidade, preco, localizacao], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, produto });
    });
});

// 3. Apagar um item da tabela produtos
router.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM produtos_db WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Produto apagado com sucesso' });
    });
});

// 4. Alterar um item da tabela produtos
router.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { produto, categoria, quantidade, preco, localizacao } = req.body;
    const query = 'UPDATE produtos_db SET produto = ?, categoria = ?, quantidade = ?, preco = ?, localizacao = ? WHERE id = ?';

    db.query(query, [produto, categoria, quantidade, preco, localizacao, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    });
});

// Iniciar o servidor
// app.listen(port, () => {
//     console.log(`API rodando em http://localhost:${port}`);
// });

app.use('/api',router)
module.exports.handler = serverless(app)