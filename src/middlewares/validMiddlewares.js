import express from 'express';

export function validarCamposObrigatorios(campos) {
  return (req, res, next) => {
    const faltando = [];

    campos.forEach(campo => {

      if (
        req.body[campo] === undefined ||
        req.body[campo] === null ||
        req.body[campo] === ""
      ) {
        faltando.push(campo);
      }
    });

    if (faltando.length > 0) {
      return res.status(400).json({
        erro: `Os seguintes campos são obrigatórios: ${faltando.join(", ")}`
      });
    }

    next();
  };
}

//ta bem básico, mas foi o que eu consegui fazer