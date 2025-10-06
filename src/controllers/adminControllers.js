import { Animal, Usuario } from "../../models/Modelos.js";

const AdminController = {

  async listarAnimais(_req, res) {
    try {
      const animais = await Animal.findAll({
        order: [["createdAt", "ASC"]],
      });

      const data = animais.map((a) => ({
        ...a.toJSON(),
        foto: a.foto ? a.foto.toString("base64") : null,
      }));

      return res.status(200).json({ data, total: data.length });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar animais (admin)." });
    }
  },

  // PATCH /admin/animais/:id
  async atualizar(req, res) {
    try {
      const { nome, especie, porte, castrado, vacinado, adotado, descricao, foto } = req.body;

      // nada a atualizar?
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
        // null -> remove; string base64 -> salva como Buffer
        animal.foto = foto ? Buffer.from(foto, "base64") : null;
      }

      await animal.save();

      const response = {
        ...animal.toJSON(),
        foto: animal.foto ? animal.foto.toString("base64") : null,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao atualizar o animal (admin)." });
    }
  },

  // DELETE /admin/animais/:id
  async deletar(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(404).json({ erro: "Animal não encontrado." });
      }

      await animal.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao remover animal (admin)." });
    }
  },
};

export default AdminController;
