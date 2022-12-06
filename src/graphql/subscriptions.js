/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCHATS = /* GraphQL */ `
  subscription OnCreateCHATS(
    $Channel: String
    $CreatedAt: Int
    $To: String
    $From: String
    $Message: String
  ) {
    onCreateCHATS(
      Channel: $Channel
      CreatedAt: $CreatedAt
      To: $To
      From: $From
      Message: $Message
    ) {
      Channel
      CreatedAt
      To
      From
      Message
    }
  }
`;
export const onUpdateCHATS = /* GraphQL */ `
  subscription OnUpdateCHATS(
    $Channel: String
    $CreatedAt: Int
    $To: String
    $From: String
    $Message: String
  ) {
    onUpdateCHATS(
      Channel: $Channel
      CreatedAt: $CreatedAt
      To: $To
      From: $From
      Message: $Message
    ) {
      Channel
      CreatedAt
      To
      From
      Message
    }
  }
`;
export const onDeleteCHATS = /* GraphQL */ `
  subscription OnDeleteCHATS(
    $Channel: String
    $CreatedAt: Int
    $To: String
    $From: String
    $Message: String
  ) {
    onDeleteCHATS(
      Channel: $Channel
      CreatedAt: $CreatedAt
      To: $To
      From: $From
      Message: $Message
    ) {
      Channel
      CreatedAt
      To
      From
      Message
    }
  }
`;
