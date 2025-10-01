import express from "express";
import {Animal} from "../../models/Modelos.js";

const animalController = {
  // Cadastrar animal
  async cadastrar(req, res) {
    try {
      const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado } = req.body;

      // Validação: use === undefined para campos booleanos
      if (
        !nome ||
        !especie ||
        !porte ||
        castrado === undefined ||
        vacinado === undefined ||
        !descricao ||
        adotado === undefined
      ) {
        return res.status(400).json({
          erro: "Todos os campos obrigatórios devem ser preenchidos corretamente."
        });
      }

      const animal = await Animal.create({
        nome,
        especie,
        porte,
        castrado: Boolean(castrado),
        vacinado: Boolean(vacinado),
        // Se vier no body, respeita; se não, deixe undefined para cair no default do modelo
        adotado: adotado !== undefined ? Boolean(adotado) : undefined,
        descricao,
        // Se receber base64, salve como Buffer. Se não vier, fica null.
        foto: foto ? Buffer.from(foto, "base64") : null
      });

      const response = {
        ...animal.toJSON(),
        foto: animal.foto ? animal.foto.toString("base64") : null
      };

      res.status(201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
    }
  },

  // Listar todos os animais (público) com filtros opcionais
  async listar(req, res) {
    try {
      const { especie, porte, castrado, vacinado, adotado } = req.query;

      const filtros = {};
      if (especie) filtros.especie = especie;
      if (porte) filtros.porte = porte;
      if (castrado !== undefined) filtros.castrado = castrado === "true";
      if (vacinado !== undefined) filtros.vacinado = vacinado === "true";
      if (adotado !== undefined) filtros.adotado = adotado === "true";

      const animais = await Animal.findAll({
        where: filtros,
        order: [["createdAt", "ASC"]],
      });

      const data = animais.map((a) => ({
        ...a.toJSON(),
        foto: a.foto ? a.foto.toString("base64") : null,
      }));

      res.status(200).json({ data, total: data.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar animais." });
    }
  },

  // Buscar animal por ID (público)
  async buscarPorId(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado." });
      }

      const response = {
        ...animal.toJSON(),
        foto: animal.foto ? animal.foto.toString("base64") : null,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar dados do animal." });
    }
  },

  // Listar todos os animais (Admin)
  async listarAdmin(_req, res) {
    try {
      const animais = await Animal.findAll({
        order: [["createdAt", "ASC"]],
      });

      const data = animais.map((a) => ({
        ...a.toJSON(),
        foto: a.foto ? a.foto.toString("base64") : null,
      }));

      res.status(200).json({ data, total: data.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar animais." });
    }
  },

  // Atualizar animal parcialmente (PATCH - Admin)
  async atualizar(req, res) {
    try {
      const { nome, especie, porte, castrado, vacinado, adotado, descricao, foto } = req.body;

      // Se nada foi enviado, retorna erro
      if (
        !nome &&
        !especie &&
        !porte &&
        castrado === undefined &&
        vacinado === undefined &&
        adotado === undefined &&
        !descricao &&
        foto === undefined
      ) {
        return res.status(400).json({ erro: "Nenhum campo foi fornecido para atualização." });
      }

      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado." });
      }

      if (nome) animal.nome = nome;
      if (especie) animal.especie = especie;
      if (porte) animal.porte = porte;
      if (castrado !== undefined) animal.castrado = Boolean(castrado);
      if (vacinado !== undefined) animal.vacinado = Boolean(vacinado);
      if (adotado !== undefined) animal.adotado = Boolean(adotado);
      if (descricao) animal.descricao = descricao;

      if (foto !== undefined) {
        // foto === null -> remove; string base64 -> salva
        animal.foto = foto ? Buffer.from(foto, "base64") : null;
      }

      await animal.save();

      const response = {
        ...animal.toJSON(),
        foto: animal.foto ? animal.foto.toString("base64") : null,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar o animal." });
    }
  },

  // Deletar animal (Admin)
  async deletar(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado." });
      }

      await animal.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao remover animal." });
    }
  },
};

export default animalController;