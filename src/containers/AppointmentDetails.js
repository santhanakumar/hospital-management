import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import PersonIcon from "@material-ui/icons/Person";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LockIcon from "@material-ui/icons/Lock";

import { KeyboardDatePicker } from "@material-ui/pickers";

import TableCell from "../components/common/TableCell";
import Header from "../components/common/Header";

import appointments from "../utils/data/appointments";
import { useParams } from "react-router-dom";
import InputLabel from "../components/common/InputLabel";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
  },
  paper: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  box: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  contentCell: {
    padding: theme.spacing(1),
    fontWeight: 600,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  rightMargin: {
    marginRight: theme.spacing(1),
  },
  scanAmount: {
    minWidth: 100
  }
}));

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getPaid = (payments) =>
  payments.reduce((total, current) => total + current.amount, 0);
const getBalance = (totalAmount, payments) => {
  const paid = payments.reduce((total, current) => total + current.amount, 0);
  return totalAmount - paid;
};

const AppointmentDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const appointment = appointments.find((item) => item.id === +id);

  const {
    ID,
    name,
    age,
    ageType,
    gender,
    amount,
    discount,
    total,
    payments,
  } = appointment;

  const billingInfo = [
    { id: 1, label: "Patient Name", value: name },
    { id: 2, label: "Patient ID", value: ID },
    {
      id: 3,
      label: "Age/Gender",
      value: `${age}${ageType}/${ucFirst(gender)}`,
    },
    { id: 4, label: "Total Amount", value: `${total} INR` },
    { id: 5, label: "Discount", value: discount },
    { id: 6, label: "Paid Amount", value: getPaid(payments) },
    { id: 7, label: "Balance", value: getBalance(amount, payments) },
  ];

  const renderLabel = (date) => {
    if (date && date.isValid()) {
      return date.format("DD MMM YYYY");
    } else {
      return "";
    }
  };

  return (
    <>
      <Header />
      <main className={clsx(classes.layout, classes.content)}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Patient Billing
          </Typography>
          <Divider />
          <Grid container spacing={2} className={classes.box}>
            <Grid item xs={12} sm={6}>
              <Typography component="h3">Current Billing Status:</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {billingInfo.map(({ id, label, value }) => (
                      <TableRow key={id}>
                        <TableCell className={classes.contentCell} align="left">
                          {label}
                        </TableCell>
                        <TableCell className={classes.contentCell} align="left">
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3">Previous Transaction:</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sno</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Paid Amount</TableCell>
                      <TableCell>Payment Mode</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointment.payments.map(({ id, date, amount, type }) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell>{type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <InputLabel>Payable Amount: </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <TextField fullWidth required variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                  <InputLabel>Payable Mode: </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <TextField required select variant="outlined">
                    <MenuItem value="CARD">CARD</MenuItem>
                    <MenuItem value="CASH">CASH</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    placeholder="CardHolder Name"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    placeholder="Card Number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <InputLabel className={clsx(classes.rightMargin, classes.scanAmount)}>
                      Scan Amount
                    </InputLabel>
                    <KeyboardDatePicker
                      disableToolbar
                      disableFuture
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      format="DD MMM YYYY"
                      labelFunc={renderLabel}
                      className={classes.rightMargin}
                      // value={dob}
                      // onChange={(date) =>
                      //   getInputHandler("dob")({ target: { value: date } })
                      // }
                    />
                    <TextField
                      required
                      placeholder="CVC"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box
                    className={classes.box}
                    display="flex"
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  );
};

export default AppointmentDetails;
