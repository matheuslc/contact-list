import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: String,
    birth_date: Date,
    contacts: [{
        type: {
            type: String
        },
        value: {
            type: String
        }
    }]
});

User.index({name: 1});

export default mongoose.model('User', User);
