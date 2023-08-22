const validateBody = (req, res, next) => {
    const { body } = req;

    const requiredFields = [
        { field: 'cpf', message: 'Campo CPF é obrigatório' },
        { field: 'email', message: 'Campo EMAIL é obrigatório' },
        { field: 'senha', message: 'Campo senha é obrigatório' },
        { field: 'dataNasc', message: 'Data de nascimento é obrigatório' },
        { field: 'genero', message: 'Genero é obrigatório' },
        { field: 'name', message: 'Nome é obrigatório' },
        { field: 'contato', message: 'Contato é obrigatório' },
        { field: 'endereco', message: 'Endereco é obrigatório' },
        { field: 'cidade', message: 'cidade é obrigatório' },
        { field: 'isProfessor', message: 'Endereco é obrigatório' },
    ];

    for (const requiredField of requiredFields) {
        const fieldValue = body[requiredField.field];

        if (fieldValue === undefined || fieldValue === '') {
            return res.status(400).json({ message: requiredField.message });
        }
    }

    next();
};

module.exports = {
    validateBody,
};
