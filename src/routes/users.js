import express from 'express';
import UserController from '../User/UserController';
import UserRepository from '../User/UserRepository';
import UserService from '../User/UserService';

const Router = new express.Router();
const UserRepositoryInstance = new UserRepository();
const UserServiceInstance = new UserService();

// Router.get('/users/:userId', function(req, res, next) {
//   const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);
//
//   Controller.createUser(req, res);
// });

Router.post('/users', (req, res, next) => {
  const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);

  Controller.createUser(req, res);
});

Router.delete('/users/:userId', (req, res, next) => {
  const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);

  Controller.deleteUser(req, res);
});

Router.put('/users/:userId', (req, res, next) => {
  const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);

  Controller.updateUser(req, res);
});

Router.get('/users/:userId/contacts', (req, res, next) => {
  const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);

  Controller.getContact(req, res);
});

Router.post('/users/:userId/contacts', (req, res, next) => {
  const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);

  Controller.addContact(req, res);
});

Router.delete('/users/:userId/contacts', (req, res, next) => {
  const Controller = new UserController(UserRepositoryInstance, UserServiceInstance);

  Controller.removeContact(req, res);
});

module.exports = Router;
