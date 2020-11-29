const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../src/utils/jwt-helpers');

const token = generateAccessToken(1, {
  // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
  expiresIn: 86400,
});

describe('User API service', () => {
  it.skip("should GET a logged in user's unique id, username, and password", (done) => {
    
    const expected = [
      {
        user_id: 2,
        username: 'admin2',
        email: 'admin2@example.com',
      }
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`)
      .send(expected)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  // run one time then skip once working
  it.skip('should PUT updated credentials for a logged in user', (done) => {
    const updatedUser = {
      user_id: '3',
      username: 'admin6',
      password: 'newPassword6',
      email: 'admin6@example.com',
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

  it.skip('should attempt to PUT updated credentials for a logged in user and return that nothing needs updating', (done) => {
    const updatedUser = {
      username: 'admin2',
      password: 'newPassword',
      email: 'admin2@example.com',
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
