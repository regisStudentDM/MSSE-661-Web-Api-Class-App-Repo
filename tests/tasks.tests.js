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

describe('Tasks API Service', function () {
  it.skip('should GET all tasks', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it.skip('should GET a single task', function (done) {
    const expected = [
      {
        id: 2,
        name: "New test task!",
        created_date: '2020-11-29T09:30:18.000Z',
        status: 'pending',
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/tasks/2')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single task', function (done) {
    const newTask = {
      name: 'New test task!',
    };
    const expected = { message: 'Added task successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
});
