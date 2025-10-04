// controllers/loginControllers.js
import { Usuario } from "../../models/Modelos.js";
import encrypt from "encryptjs";

const loginController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // 1) Buscar usuário
      const user = await Usuario.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      // 2) Descriptografar a senha salva no banco
      const senhaBanco = encrypt.decrypt(user.senha, process.env.SECRET_KEY, 256);

      // 3) Comparar com a senha enviada (pura)
      if (String(senha).trim() !== String(senhaBanco).trim()) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      // 4) OK
      return res.json({
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          nome_completo: user.nome_completo,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  },
};

export default loginController;
