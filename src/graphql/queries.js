/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCHATS = /* GraphQL */ `
  query GetChats($Channel: String!, $CreatedAt: Int!) {
    getChats(Channel: $Channel, CreatedAt: $CreatedAt) {
      Channel
      CreatedAt
      To
      From
      Message
    }
  }
`;
export const listCHATS = /* GraphQL */ `
  query ListChats(
    $filter: TableChatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
