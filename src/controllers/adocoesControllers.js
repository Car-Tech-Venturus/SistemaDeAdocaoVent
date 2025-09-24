

const AdocoesController = {
    // Finalizar adoção
    async create(req, res) {
        try {
            const { pedidoAdocaoId, dataAdocao } = req.body;

            // Valida campos obrigatórios
            if (!pedidoAdocaoId || !dataAdocao) {
                return res.status(400).json({ error: 'pedidoAdocaoId e dataAdocao são obrigatórios.' });
            }

            // Cria a adoção
            const adocao = await AdocaoModel.create({
                pedidoAdocaoId,
                dataAdocao
            });

            return res.status(201).json({
                message: 'Adoção finalizada com sucesso!',
                adocao
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro ao finalizar adoção.',
                details: error.message
            });
        }
    }
};

export default AdocoesController;
