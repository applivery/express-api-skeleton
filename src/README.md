# express-api-skeleton

## Commands

- **yarn serve** _Launch server with hot-reloading_
- **yarn start** _Launch server without hot-reloading_
- **yarn test** _Run tests_
- **yarn test-dev** _Run tests with watcher_
- **yarn test-coverage** _Calculate Code Coverage_
- **yarn deploy** _Deploy in now_

## Urls and components

The api is serve in http://localhost:8082

### Componentes Structure

- Samples
  - SubSamples
- Tracks

### Api Documentation

- OpenApi definition: http://localhost:8082/v1/doc/api.json
- Swagger UI: http://localhost:8082/v1/doc/api-ui
- ReDoc UI: http://localhost:8082/v1/doc/api-ui2

## Technologies

* **API**
  - [body-parser](https://github.com/expressjs/body-parser) _Node.js body parsing middleware_
  - [compression](https://github.com/expressjs/compression) _Node.js compression middleware._
  - [cors](https://github.com/expressjs/cors) _CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options_
  - [express](https://github.com/expressjs/express) _Fast, unopinionated, minimalist web framework for node._
  - [express-deliver](https://github.com/edus44/express-deliver) _Make API json responses easily using generators (or async/await) and promises._
  - [express-mung](https://github.com/richardschneider/express-mung) _Middleware for express responses._

* **Models**
  - [mongoose](https://github.com/Automattic/mongoose) _Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment._
  - [mongoose-paginate-v2](https://github.com/aravindnc/mongoose-paginate-v2) _A cursor based custom pagination library for Mongoose with customizable labels._
  - [mongoose-timestamp](https://github.com/drudge/mongoose-timestamp) _Simple plugin for Mongoose which adds createdAt and updatedAt date attributes that get auto-assigned to the most recent create/update timestamp._

* **Logging**
  - [debug](https://github.com/visionmedia/debug) _A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers._

* **Comunications**
  - [axios](https://github.com/axios/axios) _Promise based HTTP client for the browser and node.js_

* **Documentation**
  - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) _Document your code and keep a live and reusable OpenAPI (Swagger) specification_
  - [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) _Adds middleware to your express app to serve the Swagger UI bound to your Swagger document._
  - [mongoose-to-swagger](https://github.com/giddyinc/mongoose-to-swagger) _
Conversion library for transforming Mongoose schema objects into Swagger schema definitions._

* **Configuration**
  - [dotenv](https://github.com/motdotla/dotenv) _Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env_

* **Testing**
  - [jest](https://github.com/facebook/jest) _Complete and ready to set-up JavaScript testing solution._
  - [mockingoose](https://github.com/alonronin/mockingoose) _A Jest package for mocking mongoose models_
  - [supertest](https://github.com/visionmedia/supertest) _HTTP assertions made easy via superagent._

* **Development**
  - [nodemon](https://github.com/remy/nodemon) _nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected._
