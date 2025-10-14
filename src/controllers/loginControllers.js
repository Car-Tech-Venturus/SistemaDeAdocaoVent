import { Usuario } from "../../models/Modelos.js";
import encrypt from "encryptjs";

const loginController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      //busca o usuário pelo email
      //pensei em fazer por ID, mas o usuário não sabe
      const user = await Usuario.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      
      const senhaBanco = encrypt.decrypt(user.senha, process.env.SECRET_KEY, 256);

      //compara as senhas
      if (String(senha).trim() !== String(senhaBanco).trim()) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      //ok
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
