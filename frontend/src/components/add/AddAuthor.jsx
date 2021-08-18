import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { ADD_AUTHOR, GET_ALL_AUTHORS } from "../queries/queries";

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

const AddAuthor = () => {
  const classes = useStyles();
  const [addAuthor, { loading, error, data }] = useMutation(ADD_AUTHOR);
  console.log(data);

  const [values, setValues] = useState({
    name: "",
    age: "",
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
    addAuthor({
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
          <Typography variant="h3" component="h3" align="left">
            Add Author
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
                Add
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddAuthor;
