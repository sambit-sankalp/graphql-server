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

import { GET_ALL_AUTHORS, GET_AUTHOR, UPDATE_AUTHOR } from "../queries/queries";

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

const AuthorEditScreen = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_AUTHOR, {
    variables: { id },
  });
  const { author } = data;
  const [
    updateAuthor,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_AUTHOR);
  console.log(data);

  const [values, setValues] = useState({
    name: author.name,
    age: author.age,
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
    updateAuthor({
      variables: {
        name: values.name,
        age: values.age,
      },
      refetchQueries: [{ query: GET_ALL_AUTHORS }],
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
                Update Author
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
                <InputLabel htmlFor="outlined-adornment-age">Age</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-age"
                  value={values.age}
                  onChange={handleChange}
                  aria-describedby="outlined-age-helper-text"
                  inputProps={{
                    name: "age",
                    "aria-label": "age",
                  }}
                  labelWidth={40}
                />
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

export default AuthorEditScreen;
