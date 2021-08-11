import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_BOOKS = gql`
  {
    authors {
      id
      name
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  console.log(data);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <h1>Hello World</h1>
      )}
    </div>
  );
};

export default BookList;
