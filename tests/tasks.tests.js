const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../src/utils/jwt-helpers');


describe('Tasks API Service', function () {
  it.skip('should GET all tasks for given user id', function (done) {
    
    request_user_id = 2;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    chai
      .request('http://localhost:3000')
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.be.eql(1);
        done();
      });
  });

  it.skip('should GET a single task for a given user', function (done) {
    request_user_id = 2;
    request_task_id = 3;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    
    const expected = [
      {
        user_id: 2,
        task_id: 3,
        task_name: "Updated test task!",
        created_date: '2020-12-02T22:17:08.000Z',
        status: 'updated',
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/tasks/' + request_task_id)
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single task for a given user', function (done) {
        
    request_user_id = 2;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    
    const newTask = {
      task_name: "New test task!",
    };
    const expected = { msg: 'Added task successfully!' };

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

  it.skip('should PUT a single task for a given user', function (done) {
    request_user_id = 2;
    request_task_id = 4;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const updated_Task_props = {
      task_name: "Updated test task!",
      status: 'updated'
    };
    
    chai
      .request('http://localhost:3000')
      .put('/api/tasks/' + request_task_id)
      .set('Authorization', `Bearer ${token}`)
      .send(updated_Task_props)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body.affectedRows).to.be.eql(1);
        done();
      });
  });

  it.skip('should DELETE a single task for a given user', function (done) {
    request_user_id = 2;
    request_task_id = 10;
    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const expected = { msg: 'Deleted successfully.' };

    chai
      .request('http://localhost:3000')
      .delete('/api/tasks/' + request_task_id)
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

});
