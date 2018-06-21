
[![Build Status](https://travis-ci.com/khuynh92/13-object-relational-mapping.svg?branch=master)](https://travis-ci.com/khuynh92/13-object-relational-mapping)

## 12-express-middleware

  Travis: https://travis-ci.com/khuynh92/13-object-relational-mapping  
  Heroku: https://khoa-13-obj-rel-mapping.herokuapp.com  
  PR: https://github.com/khuynh92/13-object-relational-mapping/pull/1  

  
in order to run this app:

 1. clone this repository

 2. in your root folder, create a .env file and set PORT to your desired port.  example: `PORT = 3000` 
 3. in your terminal, locate where you cloned this repository, and then type the command:  
      `npm start`  
 4. in your broswer go to  
`http://localhost:<YOURPORTHERE>`  

 5. Here, you can test different RESTful routes to ensure GET requests are working for `/api/v1/pizza`  
    `http://localhost::<YOURPORTHERE>/api/v1/pizza/<ID>!`   

 6. To test POST, use your choice of tools that makes requests to servers (httpie, postman). Make sure to send an object body, or a 400 error will appear. POST requests will only work on api/v1/pizza.

 7. To test DELETE, use your choice of tools that makes requests to servers (httpie, postman). If no id query is passed, a 404 error will appear. DELETE requests will only work on pathnames with id parameters: `api/v1/pizza/<your id here>`.

 8. To test PUT, use your choice of tools that makes request to servers (httpie, postman). Make sure to send an object body, or a 400 error will appear. Make sure to enter a valid id in the URL, or a 404 error will appear. `api/v1/pizza/<your id here>`


This lab was built off of codefellows 14-object-relational-mapping demo code.
