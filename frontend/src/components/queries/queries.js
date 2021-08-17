import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  {
    books {
      id
      name
      genre
      author {
        id
        name
        age
      }
    }
  }
`;

export const GET_ALL_AUTHORS = gql`
  {
    authors {
      id
      name
      age
      books {
        id
        name
        genre
      }
    }
  }
`;
