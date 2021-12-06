import express from 'express';
import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

// Model Import 
import Grocery from '../models/groceryModel.js';

// Data Import
import data from '../data.js';

const groceryRouter = express.Router();

groceryRouter.get('/', expressAsyncHandler(async(req, res) => {
    const grocery = await Grocery.find({});
    res.send(grocery);
}));

groceryRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const grocery = await Grocery.findById(req.params.id);
    res.send(grocery);
}))

groceryRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    const grocery = new Grocery({
        name: 'default',
        quantity: 1,
    });
    const newGrocery = await grocery.save();
    res.send({message: 'Grocery Created', grocery: newGrocery});
}));

groceryRouter.put('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const grocery = await Grocery.findById(req.params.id);
    if (grocery) {
        grocery.name = req.body.name || grocery.name;
        grocery.quantity = req.body.quantity || grocery.quantity;

        const updatedGrocery = await grocery.save();
        res.send({message: 'Grocery Item Updated', grocery: updatedGrocery});
    } else {
        res.status(404).send({message: 'Grocery Not Found'});
    }
}));

groceryRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const grocery = await Grocery.findById(req.params.id);
    if (grocery) {
        const deletedGrocery = grocery.remove();
        res.send({message: 'Grocery Deleted', grocery: deletedGrocery});
    } else {
        res.status(404).send({message: 'Grocery not found'});
    }
}));

export default groceryRouter;