const express = require('express');
const app = express();

app.use(express.json());

const routes = [
    require('../routes/userRouter'),
    require('../routes/alunoRouter'),
    require('../routes/professorRouter'),
    require('../routes/aulaRouter'),
    require('../routes/treinoRouter'),
    require('../routes/exercicioRouter')
];

routes.forEach(route => {
    app.use(route);
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;
