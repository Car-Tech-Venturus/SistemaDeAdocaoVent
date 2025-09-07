import express from 'express'; //não tenho certeza se precisa, mas achei melhor colocar
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

//verificar se o token JWT é válido
export function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ erro: "Token de autenticação não fornecido" });
  }

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido ou expirado" });
    }

    
    req.usuario = usuario;
    next();
  });
}

//verificar se o usuário é Admin
export function apenasAdmin(req, res, next) {
  if (!req.usuario || req.usuario.role !== "admin") {
    return res.status(403).json({ erro: "Acesso restrito para administradores" });
  }
  next();
}
