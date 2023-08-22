const validateBody = (req, res, next) => {
    const { body } = req;

    const requiredFields = [
        { field: 'titulo', message: 'Campo Titulo é obrigatório' },
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
