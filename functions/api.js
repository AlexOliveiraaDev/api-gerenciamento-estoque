require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const serverless = require('serverless-http');


const app = express();
const port = 3000;
const router = express.Router();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

router.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos_db', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

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

router.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM produtos_db WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Produto apagado com sucesso' });
    });
});

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

app.use('/api',router)
module.exports.handler = serverless(app)
