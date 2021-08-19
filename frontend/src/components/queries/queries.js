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

export const GET_BOOK = gql`
  query($id: ID!){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
      }
    }
  }
`;

export const GET_AUTHOR = gql`
  query ($id: ID!) {
    author(id: $id) {
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


export const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation ($name: String!, $age: String!) {
    addAuthor(name: $name, age: $age) {
      name
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation ($id: ID!, $name: String, $genre: String, $authorId: ID) {
    updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation ($id: ID!, $name: String, $age: String) {
    updateAuthor(id: $id, name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      id
      name
      genre
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation ($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      age
    }
  }
`;
