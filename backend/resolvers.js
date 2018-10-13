// import { PubSub } from 'graphql-subscriptions';
import _ from 'lodash';
import Sequelize from 'sequelize';


const Op = Sequelize.Op;

export default {

  Query: {
    searchCities: (parent, { name }, { models }) =>
      models.City.findAll({ where: { [Op.and]: [{City: {[Op.gte]: Sequelize.fn('lower',`${name}`)}},
        {City: {[Op.lte]: Sequelize.fn('lower',`${name}~`)}} ]}, limit: 20,
        order: [[ 'Country'], ['Region'], ['City']] }, { raw: true }),
    // searchCities: (parent, { name }, { models }) =>
    //   models.City.findAll({ where: { City: { $iLike: `${name}%` } }, limit: 20, order: [[ 'City']] }, { raw: true }),

  }

};