const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../src/utils/jwt-helpers');


describe('Parts API Service', function () {
  it.skip('should GET all parts for given user id', function (done) {
    
    request_user_id = 1;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    chai
      .request('http://localhost:3000')
      .get('/api/parts')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.be.eql(2);
        done();
      });
  });

  it.skip('should GET a single part for a given user', function (done) {
    request_user_id = 2;
    request_part_id = 3;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    
    const expected = [
      {
        user_id: 2,
        part_id: 3,
        part_name: "part 1 part for user 2",
        part_unit: 'tubes',
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/parts/' + request_part_id)
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should GET a single part ID for a given user with a given part name', function (done) {
    request_user_id = 2;
    request_part_name = "part 1 part for user 2";

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });

    const expected =
    {
      part_id: 3,
    };

    chai
      .request('http://localhost:3000')
      .get('/api/parts/getPartIdByName/' + request_part_name)
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body[0]).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single part for a given user', function (done) {
        
    request_user_id = 1;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    
    const newPart = {
      part_name: "part 1 part for user 1",
      part_unit: "feet",
    };
    const expected = { msg: 'Added part successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/parts')
      .set('Authorization', `Bearer ${token}`)
      .send(newPart)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should PUT a single part for a given user', function (done) {
    request_user_id = 2;
    request_part_id = 4;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const updated_Part_props = {
      part_name: "Updated test part!",
      part_unit: 'updated part unit!'
    };
    
    chai
      .request('http://localhost:3000')
      .put('/api/parts/' + request_part_id)
      .set('Authorization', `Bearer ${token}`)
      .send(updated_Part_props)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body.affectedRows).to.be.eql(1);
        done();
      });
  });

  it.skip('should DELETE a single part for a given user', function (done) {
    request_user_id = 2;
    request_part_id = 4;
    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const expected = { msg: 'Deleted successfully.' };

    chai
      .request('http://localhost:3000')
      .delete('/api/parts/' + request_part_id)
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

});
