const express = require('express');
const userRoutes = require('./routes/userRouter');
const alunoRoutes = require('./routes/alunoRouter');
const profRoutes = require('./routes/professorRouter')

const app = express();

app.use(express.json());

//routes
app.use(userRoutes);
app.use(alunoRoutes);
app.use(profRoutes)

module.exports = app;