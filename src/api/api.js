'use strict';


import express from 'express';
import fs from 'fs';
const router = express.Router();

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  fs.readFile(__dirname + '/../../public/index.html', (err, data) => {
    let message = `HOMEPAGE <br><br> access api by going  <a href='api/v1/pizza'>here`;
    res.write(data.toString().replace('{{template}}', message));
    res.end();
  });
});

router.get('/api/v1/:model', (req, res, next) => {
  req.model.find({})
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  req.model.findById(req.params.id)
    .then(data => {
      if (data === null) {
        next('404');
      } else {
        sendJSON(res, data);
      }
    })
    .catch(next);

});

router.post('/api/v1/:model', (req, res, next) => {

  if (Object.keys(req.body).length === 0) {
    next('400');
  } else {
    let data = new req.model(req.body);
    data.save()
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  req.model.findById(req.params.id)
    .then(data => {
      if (data === null) {
        next('400');
      } else {
        req.model.findByIdAndDelete(req.params.id)
          .then(() => {
            let data = `${req.params.id} has been removed`;
            sendJSON(res, data);
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next('400');
  } else {
    req.model.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((data) => {
        sendJSON(res, data);
      })
      .catch(next);

  }
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};


export default router;
