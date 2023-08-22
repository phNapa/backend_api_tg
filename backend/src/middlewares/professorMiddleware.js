const validateBody = (req, res, next) => {
    const { body } = req;

    const requiredFields = [
        { field: 'certificacoes', message: 'Campo Certificações é obrigatório' },
        { field: 'dispoHorario', message: 'Campo Disponibilidade de Horário é obrigatório' },
        { field: 'especialidade', message: 'Campo Especialidade é obrigatório' },
        { field: 'experiencia', message: 'Campo Experiência é obrigatório' },
        { field: 'userID', message: 'Campo ID de Usuário é obrigatório' },
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
