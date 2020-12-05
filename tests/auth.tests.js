const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API service', () => {
  // run one time then skip once working
  it.skip('should POST a new user (register)', (done) => {
    const testUser = {
      username: 'admin2',
      password: 'pass2',
      email: 'admin2@example.com',
    };
    const expected = { msg: 'New user created!' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        console.log(resp.body);
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it.skip('should not POST a new user if they already exist', (done) => {
    const testUser = {
      username: 'admin8',
      password: 'password8',
      email: 'admin8@example.com',
    };
    const expected = { msg: 'User already exists!' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it.skip('should POST a login for an existing', (done) => {
    const testUser = {
      username: 'admin2',
      password: 'p2',
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body.auth).to.be.true;
        expect(resp.body.expires_in).to.be.eql(86400);
        expect(resp.body.access_token).to.be.a('string');
        expect(resp.body.refresh_token).to.be.a('string');
        done();
      });
  });

  it.skip('should NOT POST a login for an incorrect password', (done) => {
    const testUser = {
      username: 'admin1',
      password: 'p2',
    };

    const expected = { msg: 'Invalid password!' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

});
