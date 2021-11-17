import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactModel = Schema({
    name: {type: String, required: true},
    nickName: {type: String},
    phone: {type: Number, required: true},
    email: {type: String},
    job: {type: String},
    company: {type: String},
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', ContactModel);
export default Contact;