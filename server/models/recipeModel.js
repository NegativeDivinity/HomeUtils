import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    metric: {type: String, required: true},
},
{
    timestamps: true,
});

const recipeSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    ingredients: [ingredientSchema],
},
{
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;