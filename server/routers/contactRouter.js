import express from 'express';
import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

// Model Import 
import Contact from '../models/contactModel.js';

// Data Import
import data from '../data.js';

const contactRouter = express.Router();

contactRouter.get('/', isAuth, expressAsyncHandler(async(req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts);
}));

contactRouter.get('/seed', async(req, res) => {
    const contacts = await Contact.insertMany(data.contacts);
    res.send(contacts);
});

export default contactRouter;