import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

import User from '../entities/user/User';
import UserDTO from '../entities/user/dtos/UserDTO';
import Password from '../entities/user/value-objects/Password';
import UserModel from '../database/models/User';
import BcryptHashGenerator from '../external/cryptography/BcryptHashGenerator';
import { app } from '../app';
import { generateToken } from '../utils/token';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', function () {
  const hashGenerator = new BcryptHashGenerator();
  const hash = hashGenerator.generate(Password.create('secret_user'));

  let userCredentials: { email: string, password: string };
  let user: UserDTO;
  let chaiHttpResponse: Response;

  beforeEach(function () {
    userCredentials = { email: 'user@user.com', password: 'secret_user' };
    user = { ...userCredentials, id: 1, username: 'user', role: 'user' };

    sinon.stub(UserModel, 'findOne').resolves({ ...user, password: hash } as any);
  });

  afterEach(function () {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  describe('/login', function () {
    it('should authenticate the user', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(userCredentials);

    const token = generateToken(User.create(user));

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.be.deep.equal({ token });
    });

    it('should not authenticate the user (email is missing)', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: userCredentials.password });

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('should not authenticate the user (password is missing)', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: userCredentials.email });

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('should not authenticate the user (email does not exist)', async function () {
      (UserModel.findOne as sinon.SinonStub).restore();
      sinon.stub(UserModel, 'findOne').resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(userCredentials);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('should not authenticate the user (incorrect password)', async function () {
      (UserModel.findOne as sinon.SinonStub).restore();
      sinon.stub(UserModel, 'findOne').resolves({ ...user, password: 'incorrect_hash' } as any);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(userCredentials);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe('/login/validate', function () {
    it('should validate the user', async function () {
      const token = generateToken(User.create(user));

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
      expect(chaiHttpResponse.body).to.be.deep.equal({ role: user.role });
    });
  });
});
