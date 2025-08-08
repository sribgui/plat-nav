const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'um-segredo-bem-forte-e-seguro';

// Simulação de banco de usuários (em produção, use um banco real e hash de senha!)
const users = {
  admin: { password: '123', name: 'Administrador', roles: ['admin', 'editor'] },
  leitor: { password: '456', name: 'Leitor Grow-pedia', roles: ['viewer'] }
};

app.use(cors());
app.use(express.json());

// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    const payload = {
      sub: username,
      name: user.name,
      roles: user.roles
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
  }
});

// Middleware para proteger rotas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });
    req.user = user;
    next();
  });
}

// Rota protegida para servir arquivos HTML
app.get('/api/content', authenticateToken, (req, res) => {
  const filePath = req.query.file;
  if (!filePath) return res.status(400).json({ message: 'Arquivo não especificado.' });

  // Caminho seguro: só permite arquivos dentro da pasta 'conteudo'
  const safePath = path.join(__dirname, '..', 'conteudo', filePath);
  if (!safePath.startsWith(path.join(__dirname, '..', 'conteudo'))) {
    return res.status(403).json({ message: 'Acesso negado.' });
  }

  fs.readFile(safePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ message: 'Conteúdo não encontrado.' });
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});