import {assert} from 'chai';

import '../../src/User/UserService';
import '../../src/User/UserController';

describe('Ok. Let\'s do it.', () => {
  const phrase = 'May the code with you';

  it('Go go go', () => assert.equal(phrase, 'May the code with you'));
});
