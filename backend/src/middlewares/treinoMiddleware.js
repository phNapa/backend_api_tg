const validateBody = (req, res, next) => {
    const { body } = req;

    const requiredFields = [
        { field: 'exercicios', message: 'Exercicios é obrigatório' },
        { field: 'cadencia', message: 'Campo cadencia de Experiência é obrigatório' },
        { field: 'series', message: 'Campo series é obrigatório' },
        { field: 'repeticoes', message: 'Campo repeticoes é obrigatório' },
        { field: 'descanso', message: 'Campo descanso é obrigatório' },
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
