import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'sinon-mongoose';
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

  it('Should create a new user', (done) => {
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

    const RepositoryStub = sinon.stub(Repository, 'persist');

    RepositoryStub.resolves({});


    request.post = sinon.stub().returns({});

    request.body = {
      name: 'Matheus'
    };

    Controller.createUser(request, response);

    response.on('end', () => {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('Should delete a user', (done) => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    let request = httpMocks.createRequest({
      method: 'DELETE',
      url: `'/users/'${Matheus._id}`,
      params: {
        name: 'Matheus'
      }
    });

    const ServiceStub = sinon.stub(Service, 'deleteUser');

    ServiceStub.resolves(Matheus)

    let response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    Controller.deleteUser(request, response);

    response.on('end', () => {
      expect(response.statusCode).to.equal(204);

      done();
    });
  });

  it('Should update user', (done) => {
    let Matheus = new UserSchema({
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

    const ServiceStub = sinon.stub(Service, 'updateUser');

    Matheus.name = 'Lucas';

    ServiceStub.resolves(Matheus);

    Controller.updateUser(request, response);

    response.on('end', () => {
      let result = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(result.name).to.equal('Lucas');

      done();
    });
  });
});
