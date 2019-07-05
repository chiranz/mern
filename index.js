const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb Connected");
    return server.listen({ port: 5000 });
  })
  .then(result => {
    console.log(`Server running at ${result.url}`);
  });
