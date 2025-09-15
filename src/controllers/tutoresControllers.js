import express from "express";
import Usuario from "../../models/Usuario.js";
import encrypt from "encryptjs";

const SECRET_KEY = process.env.SECRET_KEY; // pesquisei muito pra fazer isso, precisa perguntar pro professores se tá certo, não pode esquecer por nada

const usuarioController = {
  // Cadastrar usuário
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
  },

  // Listar todos os usuários
  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha'] } });
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  },

  // Buscar usuário por ID
  async buscarPorId(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id, { attributes: { exclude: ['senha'] } });
      if (!usuario) {
        return res.status(404).json({ erro: "Tutor não encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
    }
  },

  // Atualizar usuário parcialmente (PATCH)
  async atualizar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome && !email && !senha) {
        return res.status(400).json({ erro: "Pelo menos um campo deve ser enviado para atualização" });
      }

      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ erro: "Tutor não encontrado" });
      }

      if (nome) usuario.nome = nome;
      if (email) usuario.email = email;
      if (senha) usuario.senha = encrypt.encrypt(senha, SECRET_KEY, 256);

      await usuario.save();

      const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
      res.json(usuarioSemSenha);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar os dados do tutor" });
    }
  }
};

export default usuarioController;
