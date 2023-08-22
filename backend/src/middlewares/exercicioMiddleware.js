const validateBody = (req, res, next) => {
    const {body} = req;

    if (body.nome == undefined){
        return res.status(400).json({message: 'Nome do exercício é obrigatório'});
    }

    if (body.cpf == ''){
        return res.status(400).json({message: 'Nome do exercício não pode ser vazio'});
    }
    next();
};

module.exports ={
    validateBody,
};