import { ApolloServer } from 'apollo-server-express';
import { merge } from 'lodash';
import { siteJournalSchema, siteJournalResolver } from './site-journal';

const resolvers = {};

const graphql = new ApolloServer({
  typeDefs: [siteJournalSchema],
  resolvers: merge(resolvers, siteJournalResolver)
});

export default graphql;
