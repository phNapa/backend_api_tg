const validateBody = (req, res, next) => {
    const { body } = req;

    const requiredFields = [
        { field: 'altura', message: 'Campo Altura é obrigatório' },
        { field: 'nivelExperiencia', message: 'Campo Nível de Experiência é obrigatório' },
        { field: 'objetivos', message: 'Campo Objetivos é obrigatório' },
        { field: 'pesoOrigem', message: 'Campo Peso de Origem é obrigatório' },
        { field: 'prefHorario', message: 'Campo Preferência de Horário é obrigatório' },
        { field: 'restrMedicas', message: 'Campo Restrições Médicas é obrigatório' },
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
