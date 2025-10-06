import { Usuario } from "../../models/Modelos.js";

// Middleware para verificar se o usuário é administrador

export async function apenasAdmin(req, res, next) {
  try {

    const email =
      (req.body && req.body.email) ||
      (req.query && req.query.email) ||
      (req.params && req.params.email);

    if (!email) {
      return res.status(401).json({ erro: "E-mail do usuário não fornecido" });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    if (!usuario.administrador) {
      return res.status(403).json({ erro: "Acesso restrito para administradores" });
    }

    // req.usuario = {
    //   id: usuario.id,
    //   email: usuario.email,
    //   administrador: usuario.administrador,
    //   nome_completo: usuario.nome_completo,
    // };

    return next();
  } catch (err) {
    console.error("Erro no apenasAdmin:", err);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}
