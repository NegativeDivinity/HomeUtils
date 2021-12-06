import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = Schema({
    name: {type: String, required: true},
    nickName: {type: String},
    phone: {type: String, required: true},
    email: {type: String},
    job: {type: String},
    company: {type: String},
}, {
    timestamps: true,
});

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    jobTitle: {type: String},
    birthday: {type: Date},
    company: {type: String},
    medicalWarning: {type: String},
    favMovie: {type: String},
    favSong: {type: String},
    userName: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    contacts: [contactSchema],
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;