import express from 'express';
import { isAuth } from '../utils.js';

// Model Import 
import Contact from '../models/contactModel.js';

// Data Import
import data from '../data.js';

const contactRouter = express.Router();

contactRouter.get('/seed', async(req, res) => {
    const contacts = await Contact.insertMany(data.contacts);
    res.send(contacts);
});

contactRouter.get('/contacts', isAuth, async(req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts);
});

export default contactRouter;