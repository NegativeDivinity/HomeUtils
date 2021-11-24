import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number},
    jobTitle: {type: String},
    birthday: {type: String},
    company: {type: String},
    hobbies: {type: String},
    medical: {type: String},
    favMovie: {type: String},
    favSong: {type: String},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;