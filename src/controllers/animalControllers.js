import express from "express";
import Animal from "../models/Animal.js";

const animalController = {
  // Cadastrar animal
  async cadastrar(req, res) {
    try {
      const { nome, raca, idade, porte, descricao } = req.body;

      // Validar campos obrigatórios
      if (!nome || !especie || !idade) {
        return res.status(400).json({ erro: "Nome, raça e idade são obrigatórios." });
      }

      const animal = await Animal.create({
        nome,
        raca,
        idade,
        porte,
        descricao
      });

      res.status(201).json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
    }
  },

  // Listar todos os animais
  async listar(req, res) {
    try {
      const animais = await Animal.findAll();
      res.json(animais);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao listar animais" });
    }
  },

  // Buscar animal por ID
  async buscarPorId(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado" });
      }
      res.json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar dados do animal" });
    }
  },

  // Atualizar animal parcialmente (PATCH)
  async atualizar(req, res) {
    try {
      const { nome, raca, idade, porte, descricao } = req.body;

      if (!nome && !raca && !idade && !porte && !descricao) {
        return res.status(400).json({ erro: "Pelo menos um campo deve ser enviado para atualização" });
      }

      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado" });
      }

      if (nome) animal.nome = nome;
      if (raca) animal.raca = raca;
      if (idade) animal.idade = idade;
      if (porte) animal.porte = porte;
      if (descricao) animal.descricao = descricao;

      await animal.save();

      res.json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar os dados do animal" });
    }
  }
};

export default animalController;
