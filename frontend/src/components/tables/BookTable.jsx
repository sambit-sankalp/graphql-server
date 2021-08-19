import React from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
} from "@material-ui/core";
import { Add, Edit, Delete } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK, GET_ALL_BOOKS } from "../queries/queries";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const BookTable = ({ data }) => {
  const classes = useStyles();
  const [deleteBook, { data: deleteData, loading, error }] =
    useMutation(DELETE_BOOK);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteBook({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: GET_ALL_BOOKS }],
      });
    }
  };

  return (
    <div>
      <Typography variant="h3" component="h3" align="left">
        Books
      </Typography>
      <Link to="/addbook">
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
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Genre</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.books.map((book) => (
              <StyledTableRow key={book.id}>
                <StyledTableCell>{book.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {book.name}
                </StyledTableCell>
                <StyledTableCell align="right">{book.genre}</StyledTableCell>
                <StyledTableCell align="right">
                  {book.author.name}
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
      </TableContainer>
    </div>
  );
};

export default BookTable;
