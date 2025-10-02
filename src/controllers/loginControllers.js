import express from "express";
import {Usuario} from "../../models/Modelos.js";
import encrypt from "encryptjs";

const SECRET_KEY = process.env.SECRET_KEY; // pesquisei muito pra fazer isso, precisa perguntar pro professores se tá certo, não pode esquecer por nada

const loginController = {
    // Já tem esse método no usuarioController, não sei pq precisa ter aqui também, tem que perguntar
   async logar(req, res) {
         const { email, senha } = req.body;
   
         // Validar campos obrigatórios
         if ( !email || !senha) {
           return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
         }
   
         // Criptografar senha
         const senhaCriptografada = encrypt.encrypt(senha, SECRET_KEY, 256);
   
         const usuario = await Usuario.create({ 
           email, 
           senha: senhaCriptografada 
         });
   
         // Retornar sem senha
         const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
         res.status(201).json(usuarioSemSenha);
       } 
    };


export default loginController;