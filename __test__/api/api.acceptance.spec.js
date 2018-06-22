'use strict';

require('babel-register');

import superr from 'supertest';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

const API_URL = '/api/v1/pizza';

const { server } = require('../../src/app.js');

const supertest = superr(server);


afterAll(() => {
  mongoose.connection.close();
});

describe('api module', () => {

  beforeAll((done) => {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://localhost/lab_13');
      done();
    });
  });

  afterEach((done) => {
    mockgoose.helper.reset().then(() => {
      done();
    });
  });


  it('get should return 200 for homepage', () => {

    return supertest.get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('HOMEPAGE'));
      });
  });


  it('get should return a 404 for valid requests when id is not found', () => {

    return supertest.get(API_URL + '/fakepath')
      .then(response => {
        expect(response.text).toBe('{"error":"Resource Not Found"}');
        expect(response.statusCode).toBe(404);
      });
  });


  it('get should get a 200 for a valid request for an existing id', () => {
    let obj = { type: 'Neapolitan', toppings: 'basil, mozzarella cheese' };
    return supertest.post(API_URL)
      .send(obj)
      .then(response => {
        let id = JSON.parse(response.text)._id;
        return supertest.get(`${API_URL}/${id}`)
          .then(response => {
            expect(JSON.parse(response.text).type).toBe('Neapolitan');
          });
      });
  });


  it('get should return 200 for an existing model', () => {

    return supertest.get(API_URL)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('[]');
      });
  });

  it('post should return 200 for a post and return back the body that was given', () => {

    let obj = { type: 'pineapples', toppings: 'cheese, pineapples, canadian bacon' };
    return supertest.post(API_URL)
      .send(obj)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('pineapples'));
      });
  });

  it('post should return 400, bad request, for when no body is given', () => {

    return supertest.post(API_URL)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Bad Request, body is needed');
      });
  });

  it('putshould return a 200 status when a good put is made with a body', () => {
    let obj = { type: 'hawaiian', toppings: 'cheese, pepperoni, bacon' };
    let obj2 = { toppings: 'cheese, pineapples, canadian bacon' };
    return supertest.post(API_URL)
      .send(obj)
      .then(response => {
        let id = JSON.parse(response.text)._id;
        return supertest.put(`${API_URL}/${id}`)
          .send(obj2)
          .then(response => {
            expect(response.statusCode).toBe(200);

            expect(JSON.parse(response.text).toppings).toEqual('cheese, pineapples, canadian bacon');
          });
      });
  });

  it('put should return 400, bad request for when a body is not passed in', () => {
    let obj = { type: 'hawaiian', toppings: 'cheese, pepperoni, bacon' };
    return supertest.post(API_URL)
      .send(obj)
      .then(response => {
        let id = JSON.parse(response.text)._id;
        return supertest.put(`${API_URL}/${id}`)
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe('Bad Request, body is needed');
          });
      });
  });

  it('put should return 404, not found when an id is not found', () => {
    let obj = {this: 'is an object'};
    return supertest.put(API_URL + '/ThisIsntThePathYoureLookingFor')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('{"error":"Resource Not Found"}');
      });
  });
});