import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import TableCell from "../components/common/TableCell";
import Header from "../components/common/Header";

import appointments from "../utils/data/appointments";
import { Link } from "react-router-dom";

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
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const getBalance = (totalAmount, payments) => {
  const paid = payments.reduce((total, current) => total + current.amount, 0);
  return totalAmount - paid;
}


const Appointments = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={clsx(classes.layout, classes.content)}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Appointments
          </Typography>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sno</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Age-Gender</TableCell>
                  <TableCell>Appointment Date</TableCell>
                  <TableCell>Balance Amount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(
                  ({
                    id,
                    name,
                    age,
                    gender,
                    appointmentDate,
                    totalAmount,
                    payments,
                  }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{`${age} - ${gender}`}</TableCell>
                      <TableCell>{appointmentDate}</TableCell>
                      <TableCell>{getBalance(totalAmount, payments)} INR</TableCell>
                      <TableCell>
                        <Link to={`/Appointments/${id}`}>Click to Pay</Link>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </main>
    </>
  );
};

export default Appointments;
