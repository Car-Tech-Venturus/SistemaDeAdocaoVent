import PedidoAdocaoModel from '../../models/PedidoAdocao.js';

const PedidoAdocaoController = {
    // Criar pedido de adoção
    async create(req, res) {
        try {
            const { tutorId, animalId, posicao_fila } = req.body;

            // Verificação de campos obrigatórios
            if (!tutorId || !animalId) {
                return res.status(400).json({ error: 'tutorId e animalId são obrigatórios.' });
            }

            // Cria o pedido com status padrão 'em_analise'
            const pedido = await PedidoAdocaoModel.create({
                tutorId,
                animalId,
                posicao_fila
            });

            return res.status(201).json({
                message: 'Pedido de adoção criado com sucesso!',
                pedido
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro ao criar pedido de adoção.',
                details: error.message
            });
        }
    }
};

export default PedidoAdocaoController;
