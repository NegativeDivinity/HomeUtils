import express from 'express';
import mongoose from 'mongoose';

// router imports
import userRouter from './routers/userRouter.js';
import contactRouter from './routers/contactRouter.js';
import todoRouter from './routers/todoRouter.js';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/home-connect');

app.use('/users', userRouter);
app.use('/contact', contactRouter);
app.use('/grouptodo', todoRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

