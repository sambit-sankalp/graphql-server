import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_BOOKS } from "../queries/queries";
import BookTable from "../tables/BookTable";

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
        <BookTable data={data} />
      )}
    </div>
  );
};

export default BookList;
