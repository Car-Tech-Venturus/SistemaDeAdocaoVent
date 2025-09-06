import express from "express";
import Animal from "../../models/Animal.js";

const animalController = {
  // Cadastrar animal
  async cadastrar(req, res) {
    try {
      const { nome, especie, raca, idade, porte, castrado, vacinado, descricao, foto } = req.body;

      // Validar campos obrigatórios (foto é opcional)
      if (!nome || !especie || !raca || !idade || !porte || castrado === undefined || vacinado === undefined || !descricao) {
        return res.status(400).json({
          erro: "Todos os campos obrigatórios devem ser preenchidos corretamente."
        });
      }

      const animal = await Animal.create({
        nome,
        especie,
        raca,
        idade,
        porte,
        castrado,
        vacinado,
        adotado: false, // por padrão
        descricao,
        foto: foto || null // aceita nulo
      });

      res.status(201).json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
    }
  },

  // Listar todos os animais (público) com filtros opcionais
  async listar(req, res) {
    try {
      const { especie, porte, castrado } = req.query;

      const filtros = {};
      if (especie) filtros.especie = especie;
      if (porte) filtros.porte = porte;
      if (castrado !== undefined) filtros.castrado = castrado === "true";

      const animais = await Animal.findAll({
        where: filtros,
        order: [["createdAt", "ASC"]]
      });

      // Converter Buffer da foto para base64, se existir
      const response = animais.map(a => ({
        ...a.toJSON(),
        foto: a.foto ? a.foto.toString("base64") : null
      }));

      res.status(200).json({
        data: response,
        total: response.length
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar animais" });
    }
  },

  // Buscar animal por ID (público)
  async buscarPorId(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado" });
      }

      const response = {
        ...animal.toJSON(),
        foto: animal.foto ? animal.foto.toString("base64") : null
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar dados do animal" });
    }
  },

  // Listar todos os animais (Admin)
  async listarAdmin(req, res) {
    try {
      const animais = await Animal.findAll({
        order: [["createdAt", "ASC"]]
      });

      const response = animais.map(a => ({
        ...a.toJSON(),
        foto: a.foto ? a.foto.toString("base64") : null
      }));

      res.status(200).json({
        data: response,
        total: response.length
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar animais" });
    }
  },

  // Atualizar animal parcialmente (PATCH - Admin)
  async atualizar(req, res) {
    try {
      const { nome, especie, raca, idade, porte, castrado, vacinado, adotado, descricao, foto } = req.body;

      if (!nome && !especie && !raca && !idade && !porte && castrado === undefined && vacinado === undefined && adotado === undefined && !descricao && !foto) {
        return res.status(400).json({ erro: "Nenhum campo foi fornecido para atualização" });
      }

      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado" });
      }

      if (nome) animal.nome = nome;
      if (especie) animal.especie = especie;
      if (raca) animal.raca = raca;
      if (idade) animal.idade = idade;
      if (porte) animal.porte = porte;
      if (castrado !== undefined) animal.castrado = castrado;
      if (vacinado !== undefined) animal.vacinado = vacinado;
      if (adotado !== undefined) animal.adotado = adotado;
      if (descricao) animal.descricao = descricao;
      if (foto !== undefined) animal.foto = foto;

      await animal.save();

      const response = {
        ...animal.toJSON(),
        foto: animal.foto ? animal.foto.toString("base64") : null
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar o animal" });
    }
  },

  // Deletar animal (Admin)
  async deletar(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado" });
      }

      await animal.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao remover animal" });
    }
  }
};

export default animalController;
