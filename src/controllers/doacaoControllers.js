import DoacaoModel from '../../models/Doacao.js';

const DoacaoController = {
    // Registrar doação
    async create(req, res) {
        try {
            const { nome, email, valor, linkPix, mensagem } = req.body;

            // Verificação dos campos obrigatórios
            if (!nome || !valor || !linkPix || !mensagem) {
                return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
            }

            // Cria a doação
            const doacao = await DoacaoModel.create({ nome, email, valor, linkPix, mensagem });

            return res.status(201).json({
                message: 'Doação registrada com sucesso!',
                doacao
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro ao registrar doação.',
                details: error.message
            });
        }
    }
};

export default DoacaoController;
