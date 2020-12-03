const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../src/utils/jwt-helpers');

describe('User API service', () => {
  it.skip("should GET a logged in user's unique id, username, and password", (done) => {
    request_user_id = 7;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });

    const expected = [
      {
        user_id: 7,
        username: 'admin11',
        email: 'admin11@example.com',
      }
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  // run one time then skip once working
  it.skip('should PUT updated credentials for a logged in user', (done) => {
    request_user_id = 6;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const updatedUser = {
      username: 'admin5update',
      password: 'password5update',
      email: 'admin5update@example.com',
    };

    const expected = { msg: 'Updated succesfully!' };

    chai
      .request('http://localhost:3000')
      .put('/api/user/me/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should attempt to PUT updated credentials for a logged in user and return that nothing needs updating', (done) => {
    request_user_id = 5;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const updatedUser = {
      username: 'admin8update',
      password: 'password8update',
      email: 'admin8update@example.com',
    };


    const expected = { msg: 'Nothing to update...' };

    chai
      .request('http://localhost:3000')
      .put('/api/user/me/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });
});
