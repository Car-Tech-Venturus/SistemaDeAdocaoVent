import AdminModel from '../../models/Usuario.js';

const AdminController = {
    // Criar administrador
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;

            // Validação dos campos obrigatórios
            if (!nome || !email || !senha) {
                return res.status(400).json({ error: 'nome, email e senha são obrigatórios.' });
            }

            // Criação do administrador
            const admin = await AdminModel.create({ nome, email, senha });

            return res.status(201).json({
                message: 'Administrador criado com sucesso!',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro ao criar administrador.',
                details: error.message
            });
        }
    }
};

export default AdminController;
