import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import { isAuth } from '../utils.js';

// Model Import
import Todo from '../models/todoModel.js';


const todoRouter = express.Router();

todoRouter.get('/', isAuth, expressAsyncHandler(async(req, res) => {
    const items = await Todo.find({});
    res.send(items);
}));

todoRouter.get('/seed', async(req, res) => {
    const createdItems = await Todo.insertMany(data.todo);
    res.send({createdItems});
});

todoRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    let time = new Date().toLocaleString();

    const item = new Todo({
        title: 'Default',
        itemTime: `${time}`,
    });
    const createdItem = await item.save();
    res.send({message: 'Item Created', item: createdItem});
}));

todoRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const item = await Todo.findById(req.params.id);
    if (item) {
        const deletedItem = await item.remove();
        res.send({message: 'Item Deleted', item: deletedItem});
    } else {
        res.status(404).send({message: 'Item not found'});
    }
}));

todoRouter.put('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const item = await Todo.findById(req.params.id);
    let time = new Date().toLocaleString();
    if (item) {
        item.title = item.title;
        item.itemTime = time;

        const updatedItem = await item.save();
        res.send({message: 'Item Updated', item: updatedItem});
    } else {
        res.status(404).send({message: 'Item not found'});
    }
}));

todoRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const item = await Todo.findById(req.params.id);
    if (item) {
        res.send(item)
    } else {
        res.status(404).send({message: 'No item found'});
    }
}));

export default todoRouter;