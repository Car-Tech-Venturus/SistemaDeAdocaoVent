import QuestionarioModel from '../../models/Questionario.js';

const QuestionarioController = {
    // Criar questionário
    async create(req, res) {
        try {
            const dados = req.body;

            // Verificação: se o questionário está vazio
            if (!dados || Object.keys(dados).length === 0) {
                return res.status(400).json({ error: 'Dados do questionário são obrigatórios.' });
            }

            // Criação do questionário
            const questionario = await QuestionarioModel.create(dados);

            return res.status(201).json({
                message: 'Questionário cadastrado com sucesso!',
                questionario
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro ao cadastrar questionário.',
                details: error.message
            });
        }
    }
};

export default QuestionarioController;
