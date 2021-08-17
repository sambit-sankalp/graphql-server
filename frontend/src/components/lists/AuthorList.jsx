import React from "react";
import { useQuery } from "@apollo/client";

import AuthorTable from "../tables/AuthorTable";
import { GET_ALL_AUTHORS } from "../queries/queries";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);
  console.log(data);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <AuthorTable data={data} />
      )}
    </div>
  );
};

export default BookList;
