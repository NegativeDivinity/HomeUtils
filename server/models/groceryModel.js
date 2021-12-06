import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GroceryModel = Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
}, {
    timestamps: true,
});

const Grocery = mongoose.model('Grocery', GroceryModel);
export default Grocery;