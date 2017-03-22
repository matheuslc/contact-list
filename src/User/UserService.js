import UserSchema from '../Schemas/UserSchema';

export default class UserService {
  /**
   * @name createUser
   * @param name
   * @param birth_date
   * @returns {Object} User Schema
   */
  createUser(name, birth_date) {
    return new UserSchema({
      name,
      birth_date
    });
  }

  /**
   * @name deleteUser
   * @param userId
   * @returns {Promise}
   */
  deleteUser(userId) {
    return UserSchema.remove({
      _id: userId
    });
  }

  updateUser(userId, newUser) {
    return UserSchema.findOneAndUpate({
      _id: userId
    }, newUser);
  }
}
