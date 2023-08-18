const validateBody = (req, res, next) => {
    const {body} = req;

    if (body.cpf == undefined){
        response.status(400).json({message: 'Campo CPF é obrigatório'});
    }

    if (body.cpf == ''){
        response.status(400).json({message: 'Campo CPF nao pode ser vazio'});
    }

    next();
};

module.exports ={
    validateBody,
};