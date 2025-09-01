import Usuario from "../models/Usuario.js"; 
import bcrypt from "bcrypt";

const usuarioController = {
  // Cadastrar usuário
  async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      // Criptografar senha antes de salvar
      const senhaHash = await bcrypt.hash(senha, 10);

      const usuario = await Usuario.create({ nome, email, senha: senhaHash });

      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
  },

  // Listar todos os usuários
  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  },

  // Buscar usuário por ID
  async buscarPorId(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  },

  // Atualizar usuário parcialmente (PATCH)
  async atualizar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      // Atualizar apenas os campos enviados
      if (nome) usuario.nome = nome;
      if (email) usuario.email = email;
      if (senha) usuario.senha = await bcrypt.hash(senha, 10);

      await usuario.save();

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  }
};

export default usuarioController;
