import chai, {expect} from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import UserSchema from '../../src/Schemas/UserSchema';
import UserRepository from '../../src/User/UserRepository';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

describe('Short URL Repository', () => {
  let Repository;

  before(() => {
    Repository = new UserRepository();
  });

  it('Should save a new User', () => {
    const date = new Date();

    const User = new UserSchema({
      name: 'Matheus',
      birthDate: date
    });

    sinon.stub(User, 'save');

    Repository.persist(User);

    sinon.assert.calledWith(User.save);
  });

  it('Should get User', () => {
    const User = new UserSchema({
      name: 'Matheus'
    });

    sinon.stub(UserSchema, 'findOne').returns(
      User
    );

    const UserFinded = Repository.getUser(User._id);

    expect(UserFinded._id).to.equal(User._id);
  });
});
