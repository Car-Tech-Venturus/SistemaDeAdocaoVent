import { Usuario } from "../../models/Modelos.js";
import encrypt from "encryptjs";

const usuarioController = {
  // Cadastrar usuário
  async cadastrar(req, res) {
    try {
      const {
        nome_completo,
        email,
        senha,
        cidade,
        estado,
        idade,
        telefone,
        celular,
        cpf,
        endereco,
        bairro,
        cep,
        instagram,
        facebook,
        administrador,
      } = req.body;

      // validação mínima
      if (!nome_completo || !email || !senha || !cidade || !estado || !idade || !telefone) {
        return res.status(400).json({
          erro: "Todos os campos obrigatórios devem ser preenchidos corretamente.",
        });
      }

      // e-mail único
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ erro: "Email já está sendo utilizado." });
      }

      // CPF único (se enviado)
      if (cpf) {
        const cpfExistente = await Usuario.findOne({ where: { cpf } });
        if (cpfExistente) {
          return res.status(400).json({ erro: "CPF já está cadastrado." });
        }
      }

      // Criptografa a senha com a SECRET_KEY atual (sem "congelar" a chave)
      const senhaCriptografada = encrypt.encrypt(String(senha).trim(), process.env.SECRET_KEY, 256);

      const usuario = await Usuario.create({
        nome_completo,
        email,
        senha: senhaCriptografada,
        cidade,
        estado,
        idade,
        telefone,
        celular,
        cpf,
        endereco,
        bairro,
        cep,
        instagram,
        facebook,
        administrador,
      });

      // retorna sem a senha
      const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
      return res.status(201).json(usuarioSemSenha);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
  },

  // Buscar por ID (sem senha)
  async buscarPorId(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id, {
        attributes: { exclude: ["senha"] },
      });
      if (!usuario) {
        return res.status(404).json({ erro: "Tutor não encontrado" });
      }
      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
    }
  },

  // Atualizar parcialmente (PATCH)
  async atualizar(req, res) {
    try {
      const {
        nome_completo,
        email,
        senha,
        cidade,
        estado,
        idade,
        telefone,
        celular,
        cpf,
        endereco,
        bairro,
        cep,
        instagram,
        facebook,
        administrador,
      } = req.body;

      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ erro: "Tutor não encontrado" });
      }

      if (nome_completo) usuario.nome_completo = nome_completo;
      if (email) usuario.email = email;
      if (senha) usuario.senha = encrypt.encrypt(String(senha).trim(), process.env.SECRET_KEY, 256);
      if (cidade) usuario.cidade = cidade;
      if (estado) usuario.estado = estado;
      if (idade) usuario.idade = idade;
      if (telefone) usuario.telefone = telefone;
      if (celular) usuario.celular = celular;
      if (cpf) usuario.cpf = cpf;
      if (endereco) usuario.endereco = endereco;
      if (bairro) usuario.bairro = bairro;
      if (cep) usuario.cep = cep;
      if (instagram) usuario.instagram = instagram;
      if (facebook) usuario.facebook = facebook;
      if (administrador !== undefined) usuario.administrador = administrador;

      await usuario.save();

      const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
      return res.json(usuarioSemSenha);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao atualizar os dados do tutor" });
    }
  },
};

export default usuarioController;
