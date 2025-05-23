require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const USUARIO_FIXO = { email: "user@exemplo.com", senha: "123456" };

app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (email === USUARIO_FIXO.email && senha === USUARIO_FIXO.senha) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ erro: "Credenciais inválidas" });
});

app.get("/status", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({ authenticated: false });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ authenticated: true });
  } catch {
    return res.json({ authenticated: false });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
