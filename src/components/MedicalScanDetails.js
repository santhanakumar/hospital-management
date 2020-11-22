import { withStyles, makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MdTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import InputLabel from "./common/InputLabel";

const TableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,
  },
  body: {
    fontSize: 14,
    border: `1px solid ${theme.palette.common.black}`,
  },
}))(MdTableCell);

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  formContainer: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
  autoCompleteInput: {
    padding: 0,
  },
}));

const scanList = [
  {
    label: "CT Brain",
    id: 1,
  },
  {
    label: "MRI Brain",
    id: 2,
  },
];

export default function PatientDetails() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} className={classes.formContainer}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <InputLabel className={classes.rightMargin}>Scan List</InputLabel>
            <Autocomplete
              options={scanList}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 }}
              className={classes.rightMargin}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    className: classes.autoCompleteInput,
                  }}
                  variant="outlined"
                />
              )}
            />
            <InputLabel className={classes.rightMargin}>Scan Amount</InputLabel>
            <div className={classes.rightMargin}>320</div>
            <InputLabel className={classes.rightMargin}>Discount</InputLabel>
            <TextField className={classes.rightMargin} variant="outlined" />
            <Button color="primary" variant="outlined">
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Sno</TableCell>
              <TableCell align="center">Scan Name</TableCell>
              <TableCell align="center">Scan Amount</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell align="center">Sno</TableCell>
            <TableCell align="center">Scan Name</TableCell>
            <TableCell align="center">Scan Amount</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">Total Amount</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.box} display="flex" justifyContent="center">
        <Button color="primary" variant="outlined">
          Save
        </Button>
      </Box>
    </Box>
  );
}
