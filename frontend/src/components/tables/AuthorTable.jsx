import React from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Fab,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Add,
  Edit,
  Delete,
} from "@material-ui/icons";
import { DELETE_AUTHOR, GET_ALL_AUTHORS } from "../queries/queries";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row({ author }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [
    deleteAuthor,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_AUTHOR);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteAuthor({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: GET_ALL_AUTHORS }],
      });
    }
  };

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell>{author.id}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {author.name}
        </StyledTableCell>
        <StyledTableCell align="right">{author.age}</StyledTableCell>
        <StyledTableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Link to={`/author/${author.id}`}>
            <Fab
              size="medium"
              color="secondary"
              aria-label="edit"
              className={classes.margin}
            >
              <Edit />
            </Fab>
          </Link>
          <Fab
            size="medium"
            color="secondary"
            aria-label="delete"
            onClick={() => deleteHandler(author.id)}
            className={classes.margin}
          >
            <Delete />
          </Fab>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Books
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Genre</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {author.books.map((book) => (
                    <StyledTableRow key={book.id}>
                      <StyledTableCell component="th" scope="row">
                        {book.id}
                      </StyledTableCell>
                      <StyledTableCell>{book.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {book.genre}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Link to={`/book/${book.id}`}>
                          <Fab
                            size="medium"
                            color="secondary"
                            aria-label="edit"
                            className={classes.margin}
                          >
                            <Edit />
                          </Fab>
                        </Link>
                        <Fab
                          size="medium"
                          color="secondary"
                          aria-label="delete"
                          onClick={() => deleteHandler(book.id)}
                          className={classes.margin}
                        >
                          <Delete />
                        </Fab>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

const AuthorTable = ({ data }) => {
  const { authors } = data;
  return (
    <div>
      <Typography variant="h3" component="h3" align="left">
        Authors
      </Typography>
      <Link to="/addauthor">
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.margin}
        >
          <Add />
        </Fab>
      </Link>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Books</StyledTableCell>
              <StyledTableCell />
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <Row key={author.id} author={author} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AuthorTable;
