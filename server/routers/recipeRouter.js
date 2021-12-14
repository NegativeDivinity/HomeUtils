import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import {isAuth} from '../utils.js';

const recipeRouter = express.Router();

recipeRouter.get('/', expressAsyncHandler(async(req, res) => {
    const recipes = await Recipe.find({});
    res.send(recipes);
}));

recipeRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.send(recipe);
}));

recipeRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = new Recipe({
        name: 'Default name',
        type: 'Default Type',
    });
    const createdRecipe = await recipe.save();
    res.send({message: 'Recipe Created', recipe: createdRecipe});
}));

recipeRouter.put('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        recipe.name = req.body.name || recipe.name;
        recipe.type = req.body.type || recipe.type;

        const updatedRecipe = await recipe.save();
        res.send({message: 'Recipe Updated', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        const deletedRecipe = await recipe.remove();
        res.send({message: 'Recipe Deleted', recipe: deletedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.post('/:id/ingredient', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        const ingredient = {
            name: 'Default name',
            quantity: 1,
            metric: 'cup',
        }
        recipe.ingredients.push(ingredient);
        const updatedRecipe = await recipe.save();
        res.send({message: 'Ingredient Added', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.put('/:id/:iid', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const ingredient = recipe.ingredients.id(req.params.iid);

    if (recipe) {
        ingredient.name = req.body.name || ingredient.name;
        ingredient.quantity = req.body.quantity || ingredient.quantity;
        ingredient.metric = req.body.metric || ingredient.metric;

        const updatedRecipe = await recipe.save();
        res.send({message: 'Ingredient Updated', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.delete('/:id/:iid/ingredient', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const ingredient = recipe.ingredients.id(req.params.iid);

    if (recipe) {
        recipe.ingredients.remove(ingredient);
        const updatedRecipe = await recipe.save();
        res.send({message: 'Ingredient Deleted', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.post('/:id/direction', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        const direction = {
            task: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        recipe.directions.push(direction);
        const updatedRecipe = await recipe.save();
        res.send({message: 'Ingredient Added', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.put('/:id/:did/direction', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const direction = recipe.directions.id(req.params.did);

    if (recipe) {
        direction.task = req.body.task || direction.task;

        const updatedRecipe = await recipe.save();
        res.send({message: 'Direction Updated', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

recipeRouter.delete('/:id/:did/direction', isAuth, expressAsyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const direction = recipe.directions.id(req.params.did);

    if (recipe) {
        recipe.directions.remove(direction);
        const updatedRecipe = await recipe.save();
        res.send({message: 'Direction Deleted', recipe: updatedRecipe});
    } else {
        res.status(404).send({message: 'No Recipe Found'});
    }
}));

export default recipeRouter;