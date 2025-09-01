import express from "express";
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

module.exports = {
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

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  },

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
  }
};