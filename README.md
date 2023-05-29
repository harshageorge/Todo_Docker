# [To do List]

This is a full stack to do list applicaton where we can add, remove, edit and delete entries in the list. This application is dockerized,containes a docker-compose.yml file. In this application, we will access both the client and the server using the Nginx proxy. Here I have used Adminer as an interactive interface to access the MySQL server.

To build and run all the containers in Docker on the root directory execute the following command.
- docker-compose up --build
To access the Adminer  you can use the route http://localhost:8000/. To start interacting with the application, open http://localhost:3050/ on a browser.

- Front-end:
  - React
  - Bootstrap

- Back-end:
  - Node.js
  - Express
  - Nginx
 
- Database:
  - MySQL