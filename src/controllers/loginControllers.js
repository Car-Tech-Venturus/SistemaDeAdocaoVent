import express from "express";
import Usuario from "../../models/Usuario.js";
import encrypt from "encryptjs";

const SECRET_KEY = process.env.SECRET_KEY; // pesquisei muito pra fazer isso, precisa perguntar pro professores se tá certo, não pode esquecer por nada

const loginController = {
    // Já tem esse método no usuarioController, não sei pq precisa ter aqui também, tem que perguntar
   async cadastrar(req, res) {
       try {
         const { nome, email, senha } = req.body;
   
         // Validar campos obrigatórios
         if (!nome || !email || !senha) {
           return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
         }
   
         // Verificar se email já existe
         const emailExistente = await Usuario.findOne({ where: { email } });
         if (emailExistente) {
           return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });
         }
   
         // Criptografar senha
         const senhaCriptografada = encrypt.encrypt(senha, SECRET_KEY, 256);
   
         const usuario = await Usuario.create({ 
           nome, 
           email, 
           senha: senhaCriptografada 
         });
   
         // Retornar sem senha
         const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
         res.status(201).json(usuarioSemSenha);
       } catch (error) {
         console.error(error);
         res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
       }
    }
};