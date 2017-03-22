import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthDate: Date,
  contacts: [{
    type: {
      type: String,
      unique: true
    },
    value: {
      type: String
    }
  }]
});

UserSchema.index({name: 1});

export default mongoose.model('User', UserSchema);
