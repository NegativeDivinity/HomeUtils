import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    jobTitle: {type: String},
    birthday: {type: Date},
    company: {type: String},
    medicalWarning: {type: String},
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