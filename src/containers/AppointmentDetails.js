import { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
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
import { useHistory, useParams } from "react-router-dom";

import TableCell from "../components/common/TableCell";
import Header from "../components/common/Header";
import InputLabel from "../components/common/InputLabel";

import { getBalance, getPaid, ucFirst } from "../utils/helper";
import { API_URL, PAYMENT_TYPE } from "../config";
import dayjs from "dayjs";

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
    minWidth: 100,
  },
}));

const AppointmentDetails = () => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.CASH);
  const [transactionNumber, setTransactionNumber] = useState("");
  const [appointment, setAppointment] = useState({});
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/appointments/${id}`);
      if (response?.data?._id) {
        setAppointment(response.data);
      } else {
        history.push("/Appointments");
      }
    })();
  }, [id]);

  const {
    name,
    age,
    ageType = "",
    gender = "",
    amount,
    discount,
    total,
    payments = [],
  } = appointment;

  const balance = getBalance(total, payments);

  const billingInfo = [
    { id: 1, label: "Patient Name", value: name },
    {
      id: 3,
      label: "Age/Gender",
      value: `${age} ${ucFirst(ageType)} / ${ucFirst(gender)}`,
    },
    { id: 4, label: "Total Amount", value: `${amount} INR` },
    { id: 5, label: "Discount", value: `${discount} INR` },
    { id: 6, label: "Paid Amount", value: `${getPaid(payments)} INR` },
    { id: 7, label: "Balance", value: `${balance} INR` },
  ];

  const onSaveClick = async () => {
    const response = await axios.post(
      `${API_URL}/appointments/addPayment/${id}`,
      {
        amount: parseInt(paymentAmount),
        type: paymentType,
        transactionNumber:
          paymentType === PAYMENT_TYPE.CARD ? transactionNumber : "",
      }
    );
    if (response?.data?.status === "success") {
      const res = await axios.get(`${API_URL}/appointments/${id}`);
      setAppointment(res?.data);
      setPaymentAmount("");
      setPaymentType(PAYMENT_TYPE.CASH);
      setTransactionNumber("");
    } else {
      alert(response?.data?.message);
    }
  };

  const canSave =
    balance <= amount &&
    paymentAmount &&
    paymentType &&
    (paymentType === PAYMENT_TYPE.CASH || transactionNumber);

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
                    {payments.map(({ _id, date, amount, type }, index) => (
                      <TableRow key={_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {dayjs(date).format("DD-MMM-YYYY")}
                        </TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell>{type}</TableCell>
                      </TableRow>
                    ))}
                    {payments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4}>No Records</TableCell>
                      </TableRow>
                    )}
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
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputLabel>Payable Mode: </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    select
                    variant="outlined"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    {[PAYMENT_TYPE.CARD, PAYMENT_TYPE.CASH].map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {paymentType === "CARD" && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Transaction Number"
                      variant="outlined"
                      value={transactionNumber}
                      onChange={(e) => setTransactionNumber(e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box className={classes.box} display="flex">
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={onSaveClick}
                      disabled={!canSave}
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
