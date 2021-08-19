import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  OutlinedInput,
  Typography,
  Select,
  Button,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS } from "../queries/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    width: "50ch",
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const AddBook = () => {
  const classes = useStyles();
  const [
    addBook,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(ADD_BOOK);
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);
  console.log(data);
  const { authors } = data;

  console.log(useQuery(GET_ALL_AUTHORS));

  const [values, setValues] = useState({
    name: "",
    genre: "",
    author: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: values.name,
        genre: values.genre,
        authorId: values.author,
      },
      refetchQueries: [{ query: GET_ALL_BOOKS }],
    });
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <Typography variant="h3" component="h3" align="left">
            Add Book
          </Typography>
          <form
            className={classes.root}
            onSubmit={submitHandler}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl
                fullWidth
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  value={values.name}
                  onChange={handleChange}
                  aria-describedby="outlined-name-helper-text"
                  inputProps={{
                    name: "name",
                    "aria-label": "name",
                  }}
                  labelWidth={40}
                />
              </FormControl>
            </div>
            <div>
              <FormControl
                fullWidth
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-genre">
                  Genre
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-genre"
                  value={values.genre}
                  onChange={handleChange}
                  aria-describedby="outlined-genre-helper-text"
                  inputProps={{
                    name: "genre",
                    "aria-label": "genre",
                  }}
                  labelWidth={40}
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-author-native-simple">
                  Author
                </InputLabel>
                <Select
                  native
                  value={values.author}
                  onChange={handleChange}
                  label="Author"
                  inputProps={{
                    name: "author",
                    id: "outlined-author-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <Link to="/addauthor">
                    <option value="">Add an Author</option>
                  </Link>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBook;
