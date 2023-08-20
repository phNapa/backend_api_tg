const express = require('express');
const userRoutes = require('../routes/userRouter');
const alunoRoutes = require('../routes/alunoRouter');
const profRoutes = require('../routes/professorRouter');
const aulaRoutes = require('../routes/aulaRouter');
const treinoRoutes = require('../routes/treinoRouter');
const exercicioRoutes = require('../routes/exercicioRouter');

const app = express();

app.use(express.json());

//routes
app.use(userRoutes);
app.use(alunoRoutes);
app.use(profRoutes);
app.use(aulaRoutes);
app.use(treinoRoutes);
app.use(exercicioRoutes);

module.exports = app;