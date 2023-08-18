const express = require('express');
const userRoutes = require('./routes/userRouter');
const alunoRoutes = require('./routes/alunoRouter');

const app = express();

app.use(express.json());

//routes
app.use(userRoutes);
app.use(alunoRoutes);

module.exports = app;