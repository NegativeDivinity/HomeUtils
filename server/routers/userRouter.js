import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import {generateToken, isAuth} from '../utils.js';
import data from '../data.js';

// file imports
import User from '../models/userModel.js';

const userRouter = express.Router()

userRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({userName: req.body.userName});
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isAdmin: user.isAdmin,
                company: user.company,
                jobTitle: user.jobTitle,
                birthday: user.birthday,
                medicalWarning: user.medicalWarning,
                favMovie: user.favMovie,
                favSong: user.favSong,
                token: generateToken(user),
            });
        } else {
            res.status(401).send({message: 'Incorrect username or password'});
        }
    } else {
        res.status(401).send({message: 'Could not find user'});
    }
}));

userRouter.get('/', isAuth, expressAsyncHandler(async(req, res) => {
    const users = await User.find({});
    res.send(users);
}));

userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({message: 'User not found'});
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;
        user.company = req.body.company || user.company;
        user.jobTitle = req.body.jobTitle || user.jobTitle;
        user.birthday = req.body.birthday || user.birthday;
        user.medicalWarning = req.body.medicalWarning || user.medicalWarning;
        user.favMovie = req.body.favMovie || user.favMovie;
        user.favSong = req.body.favSong || user.favSong;

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();

        res.send({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            userName: updatedUser.userName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            company: updatedUser.company,
            jobTitle: updatedUser.jobTitle,
            birthday: updatedUser.birthday,
            medicalWarning: updatedUser.medicalWarning,
            favMovie: updatedUser.favMovie,
            favSong: updatedUser.favSong,
            token: generateToken(updatedUser),
        });
    } else {
        res.status(404).send({message: 'User not found'});
    };
}));

userRouter.post('/:id/contacts', isAuth, expressAsyncHandler(async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
        const contact = {
            name: 'default name',
            phone: '(111) 111-1111',
        }
        user.contacts.push(contact);
        const updatedUser = await user.save();
        res.send({message: 'Created Contact', contact: updatedUser.contacts});
    }
}));

userRouter.delete('/:id/contact/:cid', isAuth, expressAsyncHandler(async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    const contactId = req.params.cid;
    if (user) {
        user.contacts.remove(contactId);
        const updatedUser = await user.save();
        res.send({message: 'Contact Deleted', contact: updatedUser.contacts});
    }
}));

userRouter.get('/:id/contact/:cid', expressAsyncHandler(async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    const contactId = req.params.cid;
    if (user) {
        res.send(user.contacts.id(contactId));
    }
}));

userRouter.put('/:id/:cid', isAuth, expressAsyncHandler(async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    const contactId = req.params.cid;
    const contact = user.contacts.id(contactId);
    if (user) {

        contact.name = req.body.name || contact.name;
        contact.nickName = req.body.nickName || contact.nickName;
        contact.phone = req.body.phone || contact.phone;
        contact.email = req.body.email || contact.email;
        contact.job = req.body.job || contact.job;
        contact.company = req.body.company || contact.company;
        
        const updatedUser = await user.save();

        res.status(201).send({message: 'Contact Updated', contact: updatedUser.contacts});
    } else {
        res.status(404).send({message: 'User not found'});
    }
}))

export default userRouter;