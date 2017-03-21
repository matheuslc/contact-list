import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import UserSchema from '../../src/Schemas/UserSchema';
import UserService from '../../src/User/UserService';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const expect = chai.expect;

describe('User Service', () => {
  let Service;

  before(() => {
    Service = new UserService();
  });

  it('Should create a new User Schema', () => {
    const date = new Date();
    const User = Service.createUser('Matheus', date);

    expect(User.name).to.equal('Matheus');
    expect(User.birth_date).to.equal(date);

    expect(User).to.have.property('name');
    expect(User).to.have.property('birth_date');
    expect(User).to.have.property('_id');
  });

  it('Should delete an User', () => {
    let date = new Date();

    const Matheus = new UserSchema({
      name: 'Matheus',
      birth_date: date
    })

    sinon.stub(UserSchema, 'remove').returns(Matheus);

    const deleted = Service.deleteUser(Matheus._id);

    expect(deleted._id).to.equal(Matheus._id);
  });
});
