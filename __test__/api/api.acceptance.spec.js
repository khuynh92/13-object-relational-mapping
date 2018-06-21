'use strict';
//supertest add server: app,   and supertest(server)
//mockgoose --> make new instance of mockgoose
require('babel-register');

// import superagent from 'superagent';
import superr from 'supertest';
import mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

const API_URL = '/api/v1/pizza';

const {server} = require('../../src/app.js');

const supertest = superr(server);



describe('api module', () => {

  beforeAll(() => {
    mockgoose.prepareStorage().then(function() {
      mongoose.connect('mongodb://localhost/lab_13');
    });
  });

  afterAll(() => {
    mockgoose.helper.reset().then(() => {
    });
  });

  it('should return 200 for homepage', () => {

    return supertest.get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('HOMEPAGE'));
      });
      
  });

  it('should return 200 for an existing model', () => {

    return supertest.get(API_URL)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('[]');
      });
      
  });

  it('should return 200 for a post and return back the body that was given', () => {

    let obj = {type: 'pineapples', toppings: 'cheese, pepperoni, canadian bacon'};
    return supertest.post(API_URL)
      .send(obj)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('"pineapples"'));

      });
  });

});