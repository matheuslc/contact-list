import UserSchema from '../Schemas/UserSchema';

export default class UserService {
  /**
   * @name createUser
   * @param name
   * @param birthDate
   * @returns {Object} User Schema
   */
  createUser(name, birthDate) {
    return new UserSchema({
      name,
      birthDate
    });
  }

  /**
   * @name deleteUser
   * @param userId
   * @returns {Query/*}
   */
  deleteUser(userId) {
    return UserSchema.remove({
      _id: userId
    });
  }

  /**
   * @name updateUser
   * @param userId
   * @param fields
   * @returns {Query/*}
   */
  updateUser(userId, fields) {
    return UserSchema.findByIdAndUpdate(userId, {
      $set: {
        name: fields.name,
        birthDate: fields.birthDate
      }
    }, {
      new: true
    });
  }

  /**
   * @name addContact
   * @param userId
   * @param type
   * @param value
   * @returns {Query|*}
   */
  addContact(userId, type, value) {
    return UserSchema.findOneAndUpdate({
      _id: userId
    }, {
      $push: {
        contacts: {
          type,
          value
        }
      }
    }, {
      new: true
    });
  }

  /**
   * @name removeContact
   * @param userId
   * @param type
   * @returns {Query|*}
   */
  removeContact(userId, type) {
    return UserSchema.findOneAndUpdate({
      _id: userId
    }, {
      $pull: {
        contacts: {
          $eq: type
        }
      }
    }, {
      new: true
    });
  }

  /**
   * @name getContact
   * @param userId
   * @param type
   * @returns {Query|T|*}
   */
  getContact(userId, type) {
    return UserSchema.find({
      _id: userId
    }, {
      contacts: {
        $elemMatch: {
          type: {
            $eq: type
          }
        }
      }
    });
  }
}
