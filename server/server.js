import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// router imports
import userRouter from './routers/userRouter.js';
import groceryRouter from './routers/groceryRouter.js';
import todoRouter from './routers/todoRouter.js';
import recipeRouter from './routers/recipeRouter.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/users', userRouter);
app.use('/grocery', groceryRouter); 
app.use('/grouptodo', todoRouter);
app.use('/recipe', recipeRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

