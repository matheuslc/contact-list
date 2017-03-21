import UserSchema from '../Schemas/UserSchema';

export default class ShortUrlRepository {

  /**
   * @name getUser
   * @param userId
   * @returns {Promise|*}
   */
  getUser(userId) {
    return UserSchema.findOne({
      _id: userId
    });
  }


  /**
   * @name persist
   * @param User
   * @returns {Promise|*}
   */
  persist(User) {
    return User.save();
  }
}
