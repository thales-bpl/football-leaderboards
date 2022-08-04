import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/user';
import { Response } from 'superagent';
import { LOGIN_RESPONSE } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe("Test post('/login') endpoint:", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(LOGIN_RESPONSE as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it("should Error code 400 and message 'All fields must be filled' if no email is provided", async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        password: "secret_admin"
      })

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

  it("should Error code 400 and message 'All fields must be filled' if no password is provided", async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "admin@admin.com"
      })

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

  it("should throw Error code 401 and message 'Incorrect email or password' if wrong email is provided", async () => {
    try {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: "random_user@admin.com",
          password: "secret_admin"
        });
    } catch (error) {
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
    }
  });

  it("should throw Error code 401 and message 'Incorrect email or password' if wrong password is provided", async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "Secret Admin"
      })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });
});
