import chai, {expect} from 'chai';
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

  it('Should get an user', done => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    const request = httpMocks.createRequest({
      method: 'GET',
      url: `'/users/'${Matheus._id}`
    });

    const RepositoryStub = sinon.stub(Repository, 'getUser');

    RepositoryStub.resolves(Matheus);

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    Controller.getUser(request, response);

    response.on('end', () => {
      const result = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(result.name).to.equal('Matheus');

      RepositoryStub.restore();

      done();
    });
  });

  it('Should thrown an error when trying to get user', done => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    const request = httpMocks.createRequest({
      method: 'GET',
      url: `'/users/'${Matheus._id}`
    });

    const RepositoryStub = sinon.stub(Repository, 'getUser');

    RepositoryStub.rejects(Matheus);

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    Controller.getUser(request, response);

    response.on('end', () => {
      expect(response.statusCode).to.equal(500);

      RepositoryStub.restore();

      done();
    });
  });

  it('Should create a new user', done => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users'
    });

    const response = httpMocks.createResponse({
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

      RepositoryStub.restore();

      done();
    });
  });

  it('Should throw an error when trying to create a new user', done => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users',
      body: {
        name: 'Matheus'
      }
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    const RepositoryStub = sinon.stub(Repository, 'persist');

    RepositoryStub.rejects({});

    Controller.createUser(request, response);

    response.on('end', () => {
      expect(response.statusCode).to.equal(500);

      RepositoryStub.restore();

      done();
    });
  });

  it('Should delete a user', done => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: `'/users/'${Matheus._id}`
    });

    const ServiceStub = sinon.stub(Service, 'deleteUser');

    ServiceStub.resolves(Matheus);

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    Controller.deleteUser(request, response);

    response.on('end', () => {
      ServiceStub.restore();
      done();
    });
  });

  it('Should update user', done => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    const request = httpMocks.createRequest({
      method: 'PUT',
      url: `'/users/'${Matheus._id}`,
      body: {
        name: 'Lucas'
      }
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    const ServiceStub = sinon.stub(Service, 'updateUser');

    Matheus.name = 'Lucas';

    ServiceStub.resolves(Matheus);

    Controller.updateUser(request, response);

    response.on('end', () => {
      ServiceStub.restore();

      const result = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(result.name).to.equal('Lucas');

      done();
    });
  });

  it('Should add a contact', done => {
    const Matheus = new UserSchema({
      name: 'Matheus'
    });

    const request = httpMocks.createRequest({
      method: 'POST',
      url: `'/users/'${Matheus._id}`,
      body: {
        type: 'Whatsapp',
        value: '9999999999'
      }
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    const ServiceStub = sinon.stub(Service, 'addContact');

    Matheus.contacts = [{
      type: 'Whatsapp',
      value: '9999999999'
    }]

    ServiceStub.resolves(Matheus);

    Controller.addContact(request, response);

    response.on('end', () => {
      ServiceStub.restore();

      const result = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(result.contacts[0].type).to.equal('Whatsapp');
      expect(result.contacts[0].value).to.equal('9999999999');
      done();
    });
  });

  it('Should get a contact', done => {
    const Matheus = new UserSchema({
      name: 'Matheus',
      contacts: [{
        type: 'celular',
        value: '9999999999'
      }]
    });

    const request = httpMocks.createRequest({
      method: 'GET',
      url: `'/users/'${Matheus._id}/contacts?type=celular`,
      params: {
        userId: Matheus._id
      }
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    const ServiceStub = sinon.stub(Service, 'getContact');

    ServiceStub.resolves(Matheus);

    Controller.getContact(request, response);

    response.on('end', () => {
      ServiceStub.restore();

      const result = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(result.contacts[0].type).to.equal('celular');
      expect(result.contacts[0].value).to.equal('9999999999');
      done();
    });
  });

  it('Should remove a contact', done => {
    const Matheus = new UserSchema({
      name: 'Matheus',
      contacts: [{
        type: 'celular',
        value: '9999999999'
      }]
    });

    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: `'/users/'${Matheus._id}/contacts?type=celular`,
      params: {
        userId: Matheus._id
      }
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    const ServiceStub = sinon.stub(Service, 'removeContact');

    Matheus.contacts = [];

    ServiceStub.resolves(Matheus);

    Controller.removeContact(request, response);

    response.on('end', () => {
      ServiceStub.restore();

      const result = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(204);
      expect(result.code).to.equal(204);
      expect(result.message).to.equal('Contact deleted.');
      done();
    });
  });
});
