export default `

  type City {
    id: Int!
    Country: String!
    City: String!
    Region: String!
    Latitude: String!
    Longitude: String!
  }

  type Query {
    searchCities(name: String!): [City!]!
  }
  schema {
    query: Query
  }
`;
