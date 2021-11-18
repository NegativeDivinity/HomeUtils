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

contactRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        res.send(contact)
    } else {
        res.status(404).send({message: 'No contact Found'});
    }
}));

contactRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    const contact = new Contact({
        name: 'Default Name',
        phone: 1
    });
    const createdContact = await contact.save();
    res.send({message: 'Contact Created', contact: createdContact});
}))

contactRouter.put('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (contact) {
        contact.name = req.body.name || contact.name;
        contact.nickName = req.body.nickName || contact.nickName;
        contact.phone = req.body.phone || contact.phone;
        contact.email = req.body.email || contact.email;
        contact.job = req.body.job || contact.job;
        contact.company = req.body.company || contact.company;

        const updatedContact = await contact.save();
        res.send({contact: updatedContact});
    } else {
        res.status(404).send({message: 'No contact found'});
    }
}));

contactRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        const deletedContact = await contact.remove();
        res.send({message: 'Contact Deleted', contact: deletedContact})
    } else {
        res.status(404).send({message: 'No contact found'})
    }
}))

export default contactRouter;