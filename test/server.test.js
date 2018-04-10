/*
  Server testing file
*/

const request = require('supertest');
const app = require('../server/app');

const { User } = require('./../server/models/users');
const { users, populateUsers } = require('./seed/seed');

describe('Server file test', () => {
  test('It should return 200', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
  });
});

beforeEach(populateUsers);

describe('POST /users', () => {
  it('Should create a user', done => {
    const userName = 'DummyUser';
    const password = '123mnb!';

    request(app)
      .post('/users')
      .send({ userName, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.userName).toBe(userName);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        return User.findOne({ userName })
          .then(user => {
            expect(user).toBeTruthy();
            expect(user.password).not.toBe(password);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('Should return validation errors if request invalid.', done => {
    request(app)
      .post('/users')
      .send({
        userName: 'and',
        password: '123',
      })
      .expect(400)
      .end(done);
  });

  it('Should not create user if userName in use.', done => {
    request(app)
      .post('/users')
      .send({
        userName: users[0].userName,
        password: 'Password123!',
      })
      .expect(400)
      .end(done);
  });
});

/* describe('POST /login.', () => {
  it('Should reject user and auth token', done => {
    request(app)
      .post('/users/login')
      .send({
        userName: users[1].userName,
        password: users[1].password,
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        return User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens[1]).toMatchObject({
              access: 'auth',
              token: res.headers['x-auth'],
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('Should reject invalid login.', done => {
    request(app)
      .post('/users/login')
      .send({
        userName: users[1].userName,
        password: `${users[1].password}1`,
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        return User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(1);
            done();
          })
          .catch(e => done(e));
      });
  });
}); */

/* describe('DELETE /logout', () => {
  it('Should remove auth token on logout', done => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        return User.findById(users[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
}); */
