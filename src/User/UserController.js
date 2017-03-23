/**
 * Class UserController
 */
class UserController {
  constructor(UserRepository, UserService) {
    this.UserRepository = UserRepository;
    this.UserService = UserService;
  }

  /**
   * @name getUser
   * @param req
   * @param res
   * @returns {$}
   */
  getUser(req, res) {
    this.UserRepository.getUser(req.params.userId)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  };

  /**
   * @name createUser
   * @param req {Object} express request
   * @param res {Object} express response
   * @returns {*}
   */
  createUser(req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        message: 'Please, provide a user name'
      });
    }

    const User = this.UserService.createUser(req.body.name, req.body.birthDate ? req.body.birthDate : '');

    return this.UserRepository.persist(User).then(user => {
      return res.status(201).json(user);
    }).catch(err => res.status(500).json(err));
  }

  /**
   * @name deleteUser
   * @param req {Object} express request
   * @param res {Object} express response
   * @returns {*}
   */
  deleteUser(req, res) {
    return this.UserService.deleteUser(req.params.userId).then(() => {
      return res.status(204).json({
        code: 204,
        message: 'User deleted.'
      });
    }).catch(err => res.status(500).json(err));
  }

  /**
   * @name updateUser
   * @param req {Object} express request
   * @param res {Object} express response
   * @returns {*}
   */
  updateUser(req, res) {
    if (!req.body.name && !req.body.birthDate) {
      return res.status(400).json({
        state: 400,
        message: 'Your should provide a new name or a new birth date'
      });
    }

    return this.UserService.updateUser(req.params.userId, req.body)
      .then(newUser => res.status(200).json(newUser))
      .catch(err => res.status(500, err));
  }

  /**
   * @name addContact
   * @param req {Object} express request
   * @param res {Object} express response
   * @returns {*}
   */
  addContact(req, res) {
    return this.UserService.addContact(req.params.userId, req.body.type, req.body.value)
      .then(updateUser => res.status(200).json(updateUser))
      .catch(err => res.status(500, err));
  }

  /**
   * @name getContact
   * @param req {Object} express request
   * @param res {Object} express response
   * @returns {*}
   */
  getContact(req, res) {
    return this.UserService.getContact(req.params.userId, req.query.type)
      .then(contact => res.status(200).json(contact))
      .catch(err => res.status(500).json(err));
  }

  /**
   * @name removeContact
   * @param req {Object} express request
   * @param res {Object} express response
   * @returns {*}
   */
  removeContact(req, res) {
    return this.UserService.removeContact(req.params.userId, req.query.type)
      .then(() => res.status(204).json({
        code: 204,
        message: 'Contact deleted.'
      })).catch(err => res.status(500).json(err));
  }
}

export default UserController;
