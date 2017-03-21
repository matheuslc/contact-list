import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'sinon-mongoose';
import 'sinon-as-promised';
import events from 'events';
import httpMocks from 'node-mocks-http';
import UserSchema from '../../src/Schemas/UserSchema';
import UserController from '../../src/User/UserController';
import UserRepository from '../../src/User/UserRepository';
import UserService from '../../src/User/UserService';

chai.should();
chai.use(sinonChai);

describe('UserController test', () => {
  let Controller;
  let Repository;
  let Service;

  before(() => {
    Repository = new UserRepository();
    Service = new UserService();
    Controller = new UserController(Repository, Service);
  });

  it('Should create a new user', () => {
    let request = httpMocks.createRequest({
      method: 'POST',
      url: '/users',
      params: {
        name: 'Matheus'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    response.on('end', () => {
      expect(response.statusCode).to.be(201);
    });
  });

  it('Should delete a user', () => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    let request = httpMocks.createRequest({
      method: 'DELETE',
      url: `'/users/'${Matheus._id}`,
      params: {
        name: 'Matheus',
        birth_date: new Date.now()
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    response.on('end', () => {
      expect(response.statusCode).to.be(200);
    });
  });

  it('Should update user', () => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    let request = httpMocks.createRequest({
      method: 'UPDATE',
      url: `'/users/'${Matheus._id}`,
      params: {
        name: 'Lucas'
      }
    });

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    response.on('end', () => {
      let result = response._getData();

      expect(response.statusCode).to.be(200);
      expect(result.name).to.be('Lucas');
    });
  });
});
