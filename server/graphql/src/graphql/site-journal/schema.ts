export const schema = `
  scalar DateTime

  type Query {
    siteJournal(after: String!, before: String!): [SiteJournal]
  }

  type SiteJournal {
    id: ID!
    journalCat: String
    sequence: Int
    message: String
    messageClass: String
    messageEvent: String
    companyCode: String
    regionCode: String
    printDate: DateTime
    generatedAt: DateTime
  }

  
`;
