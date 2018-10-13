const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import bodyParser from 'body-parser';
const cors = require('cors')

import express from "express";
const axios = require("axios");
const app = express();
import resolvers from './resolvers';

var graphqlHTTP = require('express-graphql');
var { buildSchema, graphql } = require('graphql');
import models from './models';
const port = process.env.PORT || 8182;

import typeDefs from './schema';



// Construct a schema, using GraphQL schema language
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// joinMonsterAdapt(schema, joinMonsterMetadata);


// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};


require("dotenv").load();

console.log(process.env.DARKSKY_API_KEY);

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
app.use(cors()) // not having cors enabled will cause an access control error

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//--------start of dummy request resposne---------
app.get("/forecast/:latLong", function (req, res, next) {
  res.send({
    latitude: 42.3601,
    longitude: -71.0589,
    timezone: "America/New_York",
    currently: {
      time: 1509993277,
      summary: "Drizzle",
      icon: "rain",
      nearestStormDistance: 0,
      precipIntensity: 0.0089,
      precipIntensityError: 0.0046,
      precipProbability: 0.9,
      precipType: "rain",
      temperature: 66.1,
      apparentTemperature: 66.31,
      dewPoint: 60.77,
      humidity: 0.83,
      pressure: 1010.34,
      windSpeed: 5.59,
      windGust: 12.03,
      windBearing: 246,
      cloudCover: 0.7,
      uvIndex: 1,
      visibility: 9.84,
      ozone: 267.44
    }
  });
});
//--------End dummy request resposne---------

//////////////////////comment out for now
// app.get("/forecast/:latLong", function(req, res, next) {
//   axios
//     .get(
//       `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${
//         req.params.latLong
//     }`

//       //}?units=si`
//     )
//     .then(resp => res.send(resp.data))
//     .catch(next);
// });
//////////////////////comment out for now

//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (req, res) {

  res.send('this is kamran building backend server for weather app running with reactjs');
})

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
    },
  })),
);
app.listen(8182, () => {
  console.log('Listening... at 8182')
});

