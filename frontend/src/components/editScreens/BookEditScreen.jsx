import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";

import {
  GET_ALL_AUTHORS,
  GET_ALL_BOOKS,
  GET_BOOK,
  UPDATE_BOOK,
} from "../queries/queries";

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
  button: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const BookEditScreen = () => {
  const { id } = useParams();
  const classes = useStyles();
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_ALL_AUTHORS);
  const { authors } = authorsData;
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
  });
  const { book } = data;
  const [
    updateBook,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_BOOK);
  console.log(data);

  const [values, setValues] = useState({
    name: book.name,
    genre: book.genre,
    author: book.author.id,
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
    updateBook({
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
          <form
            className={classes.root}
            onSubmit={submitHandler}
            noValidate
            autoComplete="off"
          >
            <div>
              <Typography variant="h3" component="h3" align="left">
                Update Book
              </Typography>
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
                  value={values.age}
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
                Update
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookEditScreen;
