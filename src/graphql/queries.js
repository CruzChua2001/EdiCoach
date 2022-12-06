/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCHATS = /* GraphQL */ `
  query GetCHATS($Channel: String!, $CreatedAt: Int!) {
    getCHATS(Channel: $Channel, CreatedAt: $CreatedAt) {
      Channel
      CreatedAt
      To
      From
      Message
    }
  }
`;
export const listCHATS = /* GraphQL */ `
  query ListCHATS(
    $filter: TableCHATSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCHATS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Channel
        CreatedAt
        To
        From
        Message
      }
      nextToken
    }
  }
`;
