/**
 * Class UserController
 */
export default class UserController {
  constructor(UserRepository, UserService) {
    this.UserRepository = UserRepository;
    this.UserService = UserService;
  }

  createUser(req, res) {
    if (!req.body.name) {
      return res.status(500).json({
        state: 500,
        message: 'Please, provide a user name'
      });
    }

    const User = this.UserService.createUser(req.body.name, req.body.birth_date ? req.body.birth_date : '')

    return this.UserRepository.persist(User).then((user) => {
      return res.status(201).json(user);
    }).catch((error) => {
      return res.status(500, error);
    });
  }

  deleteUser(req, res) {
    return this.UserService.deleteUser(req.params.userId).then(() => {
      return res.status(204).json({
        code: 204,
        message: 'Deleted'
      })
    }).catch((error) => {
      return res.status(500, error);
    })
  }

  updateUser(req, res) {
    return this.UserService.updateUser(req.params.userId).then((newUser) => {
      return res.status(200).json(newUser);
    }).catch((error) => {
      return res.status(500, error);
    });
  }
}
