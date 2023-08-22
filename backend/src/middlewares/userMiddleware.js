

const validateBody = (req, res, next) => {
    const {body} = req;

    if (body.cpf == undefined){
        response.status(400).json({message: 'Campo CPF é obrigatório'});
    }

    if (body.cpf == ''){
        response.status(400).json({message: 'Campo CPF nao pode ser vazio'});
    }

    if (body.email == undefined){
        response.status(400).json({message: 'Campo EMAIL é obrigatório'});
    }

    if (body.email == ''){
        response.status(400).json({message: 'Campo EMAIL nao pode ser vazio'});
    }

    if (body.senha == undefined){
        response.status(400).json({message: 'Campo senha é obrigatório'});
    }

    if (body.senha == ''){
        response.status(400).json({message: 'Campo senha nao pode ser vazio'});
    }

    next();
};

module.exports ={
    validateBody,
};